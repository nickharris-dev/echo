module.exports = {
    allFiles: [
        '<%= package.paths.src %>/<%= package.paths.assets.dev %>/css/**/*.scss'
    ],
    options: {
        bundleExec: false,
        config: 'config/scss-lint.yml',
        reporterOutput: null
    }
};
