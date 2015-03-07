module.exports = {
    allFiles: [
        '<%= package.paths.src %>/**/*.scss',
        '!<%= package.paths.src %>/**/normalize.scss',
        '!<%= package.paths.src %>/**/type-scale.scss'
    ],
    options: {
        bundleExec: false,
        config: 'config/scss-lint.yml',
        reporterOutput: null
    }
};
