module.exports = {
    allFiles: [
        '<%= package.paths.src %>/<%= package.paths.assets.dev %>/css/**/*.scss',
        '!<%= package.paths.src %>/<%= package.paths.assets.dev %>/css/**/normalize.scss',
        '!<%= package.paths.src %>/<%= package.paths.assets.dev %>/css/**/type-scale.scss'
    ],
    options: {
        bundleExec: false,
        config: 'config/scss-lint.yml',
        reporterOutput: null
    }
};
