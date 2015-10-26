.fixtures {
  display: block;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  position: relative; }
  .fixtures__fixture {
    position: relative; }
    .fixtures__fixture--mini {
      box-sizing: border-box;
      color: white;
      overflow: hidden; }
      .fixtures__fixture--mini a {
        background-color: (light: #c8c8c8, copy: #464646);
        background-position: 90% 50%;
        background-repeat: no-repeat;
        background-size: auto 6rem;
        box-shadow: none;
        box-sizing: border-box;
        color: inherit;
        display: block;
        padding: 1.5rem 0.4375rem;
        white-space: normal; }
      .fixtures__fixture--mini .fixtures__fixture--pale {
        color: (light: #c8c8c8, copy: #464646); }
      .fixtures__fixture--mini .fixtures__host {
        font-size: 1rem;
        line-height: 1.5;
        margin: 0; }
  .fixtures--linear {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
        -ms-flex-direction: row;
            flex-direction: row;
    height: 12rem;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
        -ms-flex-pack: center;
            justify-content: center;
    max-height: 1000em;
    overflow: visible;
    padding: 0 8.33333%; }
    .fixtures--linear .fixtures__fixture--mini {
      height: 12rem;
      min-width: 9.375rem;
      width: 9.375rem; }
      .fixtures--linear .fixtures__fixture--mini a {
        background-position: 160% -0.75rem;
        background-size: auto 6rem;
        bottom: 0;
        left: 0.4375rem;
        padding-top: 7.5rem;
        position: absolute;
        width: 8.5rem; }
    .fixtures--linear .slider__button {
      display: none;
      height: 100%;
      opacity: .5;
      position: absolute;
      top: 0;
      width: 3.125rem; }
      .fixtures--linear .slider__button--active {
        display: block; }
      .fixtures--linear .slider__button--next {
        right: 0; }
      .fixtures--linear .slider__button--prev {
        left: 0;
        -webkit-transform: scaleX(-1);
            -ms-transform: scaleX(-1);
                transform: scaleX(-1); }
