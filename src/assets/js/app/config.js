/*
generic module to return the global config object within require.config
*/
define(['module'], function (module) {
    return module.config();
});