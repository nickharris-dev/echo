define(['require', 'config', 'idFactory', 'classes', 'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCwRffT8sStG1kBc5v9u0QE10hcEAvK7dk'], function(require, config, idFactory, classes){
  var activeClass = 'training__trigger--active';
  var processingClass = 'training__trigger--processing';
  var training = document.getElementById('Training');
  var directionsService = new google.maps.DirectionsService();
  var maps = {};

  function mapFactory(session) {
    var mapDiv = session.querySelectorAll('.training__map')[0];
    var ID = idFactory(session);
    var lat = parseFloat(session.getAttribute('data-lat'));
    var lng = parseFloat(session.getAttribute('data-lng'));
    var location = new google.maps.LatLng(lat,lng);
    var map;

    // Maps configuration
    var mapOptions = {
      center: location,
      zoom: 14,
      scrollwheel: false,
      draggable: false,
      disableDefaultUI: true
    };
    var directionsOptions = {
      polylineOptions: {
        strokeColor: 'rgba(92, 4, 37, .7)'
      },
      preserveViewport: true,
      suppressMarkers: true
    };

    // Draw the map
    // ============
    map = new google.maps.Map(mapDiv, mapOptions);

    // Set up the storage for maps data
    // ==================
    maps[ID] = {};
    maps[ID].map = map;
    maps[ID].markers = {};
    maps[ID].markers.origins = [];
    maps[ID].renderers = [];
    maps[ID].directionsOptions = directionsOptions;
    maps[ID].session = session;
    maps[ID].location = location;
    maps[ID].bounds = new google.maps.LatLngBounds();
    maps[ID].bounds.extend(location);

    // Drop the training marker
    // ===============
    maps[ID].markers.training = new google.maps.Marker({
      clickable: false,
      position: location,
      map: map
    });

    // Re-render map on resize
    session.addEventListener('resizeEnd', function(){
      google.maps.event.trigger(map, 'resize');
    });
    google.maps.event.addListenerOnce(map, 'bounds_changed', function(){
      offsetMap(map, session);
    });
    google.maps.event.addListener(map, 'resize', function(){
      offsetMap(map, session);
    });
  }

  function offsetMap(map, session){
    var ID = idFactory(session);
    // Holders for offset values, that will depend on other vars
    var offsetx, offsety;

    // Map position information
    var center = maps[ID].bounds.getCenter();
    center = map.getProjection().fromLatLngToPoint(center);

    // Info box info
    var paddingBottom = parseFloat(getComputedStyle(session)['padding-bottom']);
    var paddingLeft = parseFloat(getComputedStyle(session)['padding-left']);
    var paddingTop = parseFloat(getComputedStyle(session)['padding-top']);
    var height = session.querySelectorAll('.training__info')[0].offsetHeight;
    var width = session.querySelectorAll('.training__info')[0].offsetWidth;

    function showInfo() {
      var i = 0;
      var n = maps[ID].markers.origins.length;

      for (i; i<n; i++) {
        maps[ID].markers.origins[i].info.open(map,maps[ID].markers.origins[i]);
      }
    }

    function afterFit(){
      var zoom = 14;
      if (maps[ID].markers.origins.length > 0) {
        zoom = map.getZoom();
      }
      map.setZoom(zoom);

      // Depending on what element query is active
      if (config.elementqueries[ID].breakpoints.stacked.active) {
        offsetx = Math.floor((paddingLeft + width)/2);
        offsety = Math.floor((paddingTop - paddingBottom)/2);
      } else {
        offsety = Math.floor((paddingTop + height)/2);
      }

      var point2 = new google.maps.Point(
          ( (typeof(offsetx) == 'number' ? offsetx : 0) / Math.pow(2, zoom) ) || 0,
          ( (typeof(offsety) == 'number' ? offsety : 0) / Math.pow(2, zoom) ) || 0
      );

      // Position the Map
      map.panTo(map.getProjection().fromPointToLatLng(new google.maps.Point(
          center.x - point2.x,
          center.y - point2.y
      )));

      // Show any infowindows
      // (Do this here to enable any autopanning)
      if (maps[ID].markers.origins.length > 0) {
        showInfo();
      }
    }

    google.maps.event.addListenerOnce(map, 'bounds_changed', afterFit);
    map.fitBounds(maps[ID].bounds);
  }

  function directionsListeners(session) {
    var menuItems = session.querySelectorAll('.training__directions li');
    var postCodeForm = session.querySelectorAll('.training__directions form')[0];
    var i = 0;
    var n = menuItems.length;

    // Geo Location Detection
    // ======================
    if (!navigator.geolocation && session.querySelectorAll('.training__directions [data-type="geo"]').length > 0) {
      var geo = session.querySelectorAll('.training__directions [data-type="geo"]')[0];
      geo.parentNode.removeChild(geo);
    }

    function processClick(event) {
      var type = this.getAttribute('data-type');

      if (classes.contains(this, activeClass) || classes.contains(this, processingClass)) {
        return false;
      }

      if (type === 'tram' || type === 'train' || type === 'bus') {
        calculateByFoot(this);
      } else if (type === 'geo') {
        calculateGeo(this);
      }
    }

    for (i; i<n; i++) {
      menuItems[i].addEventListener('click', processClick);
    }

    if (postCodeForm) {
      var label = document.createElement('label');
      label.setAttribute('id', 'PostcodeMessage');
      label.setAttribute('for', 'PostcodeInput');
      label.setAttribute('class', 'training__message');
      postCodeForm.appendChild(label);

      postCodeForm.addEventListener('submit', function(event){
        event.preventDefault();
        calculatePostcode(session, postCodeForm.querySelectorAll('input')[0].value);
      });
    }
  }

  function calculateByFoot(menuItem) {
    var session = menuItem.parentNode.parentNode.parentNode;
    var ID = idFactory(session);

    var locationData = menuItem.getAttribute('data-locations').replace(/'/g,'"');
    var locations = JSON.parse('[' + locationData + ']');

    // Clear old routes
    clearRoute(ID);

    // Set Active
    classes.add(menuItem, activeClass);

    // Draw new Routes
    processLocations();

    function requestFactory(location) {
      var origin = new google.maps.LatLng(location.lat,location.lng);

      var request = {};
      request.origin = origin;
      request.destination = maps[ID].location;
      request.travelMode = google.maps.TravelMode.WALKING;

      routeFinder(maps[ID], location.name, request);
    }

    function processLocations() {
      var i = 0;
      var n = locations.length;
      for (i; i<n; i++) {
        requestFactory(locations[i]);
      }
      googleLinkFactory(session);
    }
  }

  function calculateGeo(menuItem)  {
    var session = menuItem.parentNode.parentNode.parentNode;
    var ID = idFactory(session);

    classes.add(menuItem, processingClass);

    function requestFactory(origin) {
      var request = {};
      request.origin = origin;
      request.destination = maps[ID].location;
      request.travelMode = google.maps.TravelMode.DRIVING;

      routeFinder(maps[ID], 'You', request);
      classes.remove(menuItem, processingClass);
      classes.add(menuItem, activeClass);
    }

    function bad() {
      classes.remove(menuItem, processingClass);
      googleLinkFactory(session);
      throw new Error('Bum');
    }

    function good(position) {
      clearRoute(ID);
      requestFactory(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      googleLinkFactory(session, {lat: position.coords.latitude, lng: position.coords.longitude});
    }

    navigator.geolocation.getCurrentPosition(good, bad);
  }

  function calculatePostcode(session, value) {
    var ID = idFactory(session);
    var postcode = value.replace(/\s/g, "");
    var regex = /^([a-zA-Z]){1}([0-9][0-9]|[0-9]|[a-zA-Z][0-9][a-zA-Z]|[a-zA-Z][0-9][0-9]|[a-zA-Z][0-9]){1}([ ])([0-9][a-zA-z][a-zA-z]){1}$/;

    clearRoute(ID);
    checkPostcode(value);

    function checkPostcode() {
      if (value === '' || !regex.test(value)) {
        bad();
      } else {
        good();
      }
    }

    function bad(str) {
      var message = document.createTextNode(str || 'Enter a Valid Postcode');
      var label = session.querySelectorAll('.training__directions .training__message')[0];

      label.innerHTML = '';

      label.appendChild(message);
      classes.add(label, 'training__message--error');
      googleLinkFactory(session);
    }

    function good() {
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({'address': value}, function(results, status){
        var location;

        if (status == google.maps.GeocoderStatus.OK) {
          location = results[0].geometry.location;
          requestFactory(location);
          googleLinkFactory(session, {lat: location.lat(), lng: location.lng()} );
        } else {
          bad(status);
        }
      });
    }

    function requestFactory(origin) {
      var request = {};
      request.origin = origin;
      request.destination = maps[ID].location;
      request.travelMode = google.maps.TravelMode.DRIVING;

      routeFinder(maps[ID], value, request);
    }
  }

  function clearRoute(ID) {
    clearMarkers();
    clearRoutes();
    clearClasses();
    maps[ID].bounds = new google.maps.LatLngBounds();
    maps[ID].bounds.extend(maps[ID].location);

    function clearClasses() {
      var menuItems = maps[ID].session.querySelectorAll('.training__directions li');
      var i = 0;
      var n = menuItems.length;

      for (i; i<n; i++) {
        classes.remove(menuItems[i], activeClass);
      }
    }

    function clearRoutes() {
      if (maps[ID].renderers.length > 0) {
        var i = 0;
        var n = maps[ID].renderers.length;
        for (i; i<n; i++) {
          maps[ID].renderers[i].setMap(null);
        }
        maps[ID].renderers = [];
      }
    }

    function clearMarkers() {
      if (maps[ID].markers.origins.length > 0) {
        var i = 0;
        var n = maps[ID].markers.origins.length;
        for (i; i<n; i++) {
          maps[ID].markers.origins[i].setMap(null);
        }
        maps[ID].markers.origins = [];
      }
    }
  }

  function routeFinder(storage, str, request) {
    var map = storage.map;
    var renderer = new google.maps.DirectionsRenderer(storage.directionsOptions);
    var miles;

    renderer.setMap(map);

    // Make the request
    directionsService.route(request, function(response, status) {
      // Proceed if everything's a-ok
      if (status == google.maps.DirectionsStatus.OK) {
        // Put a marker at the route's start point and save it
        var marker = new google.maps.Marker({
          clickable: false,
          position: request.origin,
          map: map
        });
        storage.bounds.extend(request.origin);

        // Add distance to the string for the tooltip
        miles = response.routes[0].legs[0].distance.value/1609.344;
        miles = Math.round(miles*10)/10;
        str += ' - ' + miles + ' miles';
        // Display a tooltip with useful info
        marker.info = new google.maps.InfoWindow({
          content: str
        });
        storage.markers.origins.push(marker);

        // Do it
        renderer.setDirections(response);
        // Store it
        storage.renderers.push(renderer);

        // Recenter the map
        offsetMap(map, storage.session);
      }
    });
  }

  function googleButtonListener(session) {
    var button = session.querySelectorAll('.training__google')[0];

    function openGoogle(event) {
      event.preventDefault();
      window.open(this.getAttribute('data-url'));
    }
    button.addEventListener('click', openGoogle);
  }

  function googleLinkFactory(session, from, travelMode) {
    var button = session.querySelectorAll('.training__google')[0];
    var daddrLat = session.getAttribute('data-lat');
    var daddrLng = session.getAttribute('data-lng');
    var daddr = 'daddr=' + daddrLat + ',' + daddrLng;
    var url = 'https://maps.google.com?';
    var saddr = '';
    var str;

    if (from) saddr = 'saddr=' + from.lat + ',' + from.lng + '&';
    str = url + saddr + daddr;

    button.setAttribute('data-url', str);
  }

  function init(){
    var sessions = training.querySelectorAll('.training__session');
    var i = 0;
    var n = sessions.length;

    for (i; i<n; i++) {
      mapFactory(sessions[i]);
      googleLinkFactory(sessions[i]);
      googleButtonListener(sessions[i]);
      directionsListeners(sessions[i]);
    }

  }

  return init();
});
