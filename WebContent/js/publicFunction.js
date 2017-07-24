sap.ui.define(function() {
	"use strict";

	var JsFunction = {		
//系统标识						
		setIdData : function(Id) {
			this._globalId = Id;
		},

		getIdData : function() {
			return this._globalId;
		},
//系统名称
		setSystemIdData : function(SystemId) {
			this._globalSystemId = SystemId;
		},

		getSystemIdData : function() {
			return this._globalSystemId;
		},
//客户端
		setClientIdData : function(ClientId) {
			this._globalClientId = ClientId;
		},

		getClientIdData : function() {
			return this._globalClientId;
		},
		
	}
	return JsFunction;
}, true);