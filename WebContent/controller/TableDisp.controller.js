sap.ui.define([ 'sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel',
		'sap/m/MessageToast', 'sap/m/MessageBox' ], function(Controller,
		JSONModel, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("MM_REPORT.controller.TableDisp", {
		onInit : function() {
		},

		onSearch : function(oEvent) {
			var oId = ZUSER_HELP.js.publicFunction.getIdData();
			this.getRouter().navTo("AlvReport", {
				Id : oId

			})
		},

		handleValueHelp : function() {
			console.log("点击 了搜索按钮");
		},
		tb1MoudleHandleValueHelp : function() {
		}
	});
});