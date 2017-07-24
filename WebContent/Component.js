jQuery.sap.declare("MM_REPORT.Component");
sap.ui.core.UIComponent.extend("MM_REPORT.Component", {
	metadata : {
		name : "MM_REPORT",
		version : "1.0",
		includes : [],
		dependencies : {
			libs : [ "sap.m", "sap.ui.layout" ],
			components : []
		},
		rootView : "MM_REPORT.view.App",

		config : {
			resourceBundle : "i18n/i18n.properties",
			serviceConfig : {
				// Odata服务定义
				me : "ZSAP_USER_HELP_SRV",
				serviceUrl : "/sap/opu/odata/sap/ZSAP_USER_HELP_SRV/"
			}
		},

		routing : {
			config : {
				routerClass : sap.m.routing.Router,
				viewType : "XML",
				viewPath : "MM_REPORT.view",
				targetAggregation : "pages",
				clearTarget : false
			},
			routes : [ {
				pattern : "",
				name : "main",
				view : "TableDisp",
				targetAggregation : "pages",
				// targetControl定义的是 什么意思
				targetControl : "idAppControl",

			}, {
				pattern : "",
				name : "display",
				view : "AlvReport",
				targetAggregation : "pages",
				targetControl : "idAppControl",

			} ]
		}

	},
	init : function() {

		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		var mConfig = this.getMetadata().getConfig();

		// Always use absolute paths relative to our own component
		// (relative paths will fail if running in the Fiori Launchpad)
		var oRootPath = jQuery.sap.getModulePath("MM_REPORT");

		// Set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : [ oRootPath, mConfig.resourceBundle ].join("/")
		});

		this.setModel(i18nModel, "i18n");

		var sServiceUrl = mConfig.serviceConfig.serviceUrl;

		/*
		 * * if (window.location.hostname == "localhost") { sServiceUrl =
		 * "proxy" + sServiceUrl; };
		 */

		// Create and set domain model to the component
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, {
			json : true,
			loadMetadataAsync : true
		});

		this.setModel(oModel);

		jQuery.sap.require("MM_REPORT.js.publicFunction");

		// Set device model
		var oDeviceModel = new sap.ui.model.json.JSONModel({
			isTouch : sap.ui.Device.support.touch,
			isNoTouch : !sap.ui.Device.support.touch,
			isPhone : sap.ui.Device.system.phone,
			isNoPhone : !sap.ui.Device.system.phone,
			listMode : sap.ui.Device.system.phone ? "None"
					: "SingleSelectMaster",
			listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
		});
		oDeviceModel.setDefaultBindingMode("OneWay");
		this.setModel(oDeviceModel, "device");
		this.getRouter().initialize();
		// this.getUserDefault();
	},
	getContentDensityClass : function() {
		if (!this._sContentDensityClass) {
			if (!sap.ui.Device.support.touch) {
				this._sContentDensityClass = "sapUiSizeCompact";
			} else {
				this._sContentDensityClass = "sapUiSizeCozy";
			}
		}
		return this._sContentDensityClass;
	},

});
