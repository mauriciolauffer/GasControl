/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/ContextBinding'],function(q,C){"use strict";var O=C.extend("sap.ui.model.odata.v2.ODataContextBinding",{constructor:function(m,p,c,P,e){C.call(this,m,p,c,P,e)}});O.prototype.initialize=function(){var t=this,d,r=this.oModel.resolve(this.sPath,this.oContext),d=this.oModel._getObject(this.sPath,this.oContext),R=this.oModel._isReloadNeeded(r,d,this.mParameters);if(this.oModel.oMetadata.isLoaded()){if(R){this.fireDataRequested()}this.oModel.createBindingContext(this.sPath,this.oContext,this.mParameters,function(c){t.oElementContext=c;t._fireChange();if(R){if(t.oElementContext){d=t.oElementContext.getObject()}t.oModel.callAfterUpdate(function(){t.fireDataReceived({data:d})})}},R)}};O.prototype.refresh=function(f,c){var t=this,d,k,s,b=false;if(c){s=this.oModel._getObject(this.sPath,this.oContext);if(s){k=this.oModel._getKey(s);if(k in c){b=true}}}else{b=true}if(f||b){this.fireDataRequested();this.oModel.createBindingContext(this.sPath,this.oContext,this.mParameters,function(o){if(t.oElementContext===o){if(f){t._fireChange()}}else{t.oElementContext=o;t._fireChange()}if(t.oElementContext){d=t.oElementContext.getObject()}t.oModel.callAfterUpdate(function(){t.fireDataReceived({data:d})})},true)}};O.prototype.setContext=function(c){var t=this,d,r,d,R;if(this.oContext!==c&&this.isRelative()){this.oContext=c;r=this.oModel.resolve(this.sPath,this.oContext);d=this.oModel._getObject(this.sPath,this.oContext);R=this.oModel._isReloadNeeded(r,d,this.mParameters);if(this.oModel.oMetadata.isLoaded()){if(R){this.fireDataRequested()}this.oModel.createBindingContext(this.sPath,this.oContext,this.mParameters,function(c){t.oElementContext=c;t._fireChange();if(R){if(t.oElementContext){d=t.oElementContext.getObject()}t.oModel.callAfterUpdate(function(){t.fireDataReceived({data:d})})}},R)}}};return O},true);
