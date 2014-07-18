/**
 StudioLite MediaSignage Inc (c) open source digital signage project.
 Visit Github for licenses and docs: http://git.digitalsignage.com
 @class StudioLite
 @constructor
 @return {Object} instantiated StudioLite
 **/
define(['underscore', 'jquery', 'backbone', 'bootstrap', 'backbone.controller', 'ComBroker', 'Lib', 'Pepper', 'PepperHelper', 'Elements', 'bootbox'], function (_, $, Backbone, Bootstrap, backbonecontroller, ComBroker, Lib, Pepper, PepperHelper, Elements, bootbox) {
    var StudioLite = Backbone.Controller.extend({

        // app init
        initialize: function () {
            var self = this;
            window.BB = Backbone;
            window.bootbox = bootbox;
            BB.globs = {};
            BB.SERVICES = {};
            BB.EVENTS = {};
            BB.CONSTS = {};
            BB.globs['UNIQUE_COUNTER'] = 0;
            BB.globs['RC4KEY'] = '226a3a42f34ddd778ed2c3ba56644315';
            BB.lib = new Lib();
            BB.lib.addBackboneViewOptions();
            BB.comBroker = new ComBroker();
            BB.comBroker.name = 'AppBroker';
            BB.Pepper = new Pepper();
            _.extend(BB.Pepper, BB.comBroker);
            BB.Pepper.clearServices();
            BB.Pepper.name = 'JalapenoBroker';
            BB.PepperHelper = new PepperHelper();
            window.pepper = BB.Pepper;
            window.log = BB.lib.log;
            BB.lib.forceBrowserCompatability();
            BB.lib.promptOnExit();


            // internationalization
            require(['LanguageSelectorView', 'Elements'], function (LanguageSelectorView, Elements) {
                self.m_languageSelectionLogin = new LanguageSelectorView({appendTo: Elements.LANGUAGE_SELECTION_LOGIN});
                var lang = self.m_languageSelectionLogin.getLanguage();
                if (lang)
                    self.m_languageSelectionLogin.setLanguage(lang);
            });

            // theme
            require(['simplestorage'], function (simplestorage) {
                var theme = simplestorage.get('theme');
                if (theme && theme != 'light')
                    BB.lib.loadCss('style_' + theme + '.css');
            });

            // router init
            require(['LayoutRouter', 'Events'], function (LayoutRouter) {
                var LayoutRouter = new LayoutRouter();
                BB.history.start();
                LayoutRouter.navigate('authenticate/_/_', {trigger: true});
            })
        }
    });

    return StudioLite;
});