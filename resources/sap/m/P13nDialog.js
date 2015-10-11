/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Dialog','./IconTabBar','./IconTabFilter','./P13nDialogRenderer','./library','sap/ui/core/EnabledPropagator','jquery.sap.xml'],function(q,D,I,a,P,l,E){"use strict";var b=D.extend("sap.m.P13nDialog",{metadata:{library:"sap.m",properties:{initialVisiblePanelType:{type:"sap.m.P13nPanelType",group:"Misc",defaultValue:null},showReset:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{panels:{type:"sap.m.P13nPanel",multiple:true,singularName:"panel",bindable:"bindable"}},events:{ok:{},cancel:{},reset:{}}}});E.apply(b.prototype,[true]);b.prototype.init=function(e){this.addStyleClass("sapMP13nDialog");D.prototype.init.apply(this,arguments);this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._initDialog()};b.prototype._initDialog=function(){var t=this;this.setContentWidth("50rem");this.setContentHeight("40rem");this.setTitle(this._oResourceBundle.getText("P13NDIALOG_VIEW_SETTINGS"));this.addButton(new sap.m.Button({text:this._oResourceBundle.getText("P13NDIALOG_OK"),press:function(){var f=function(){var p={};t.getPanels().forEach(function(o){p[o.getType()]=o.getOkPayload()});t.fireOk({payload:p})};var c=function(){t.getPanels().forEach(function(p){if(F.indexOf(p.getType())>-1){p.onAfterNavigationFrom()}});f()};var F=[];t.getPanels().forEach(function(p){if(!p.onBeforeNavigationFrom()){F.push(p.getType())}});if(F.length){t.showValidationDialog(c,null,F)}else{f()}}}));this.addButton(new sap.m.Button({text:this._oResourceBundle.getText("P13NDIALOG_CANCEL"),press:function(){t.fireCancel()}}));this._oResetButton=new sap.m.Button({text:this._oResourceBundle.getText("P13NDIALOG_RESET"),visible:this.getShowReset(),press:function(){t.fireReset({})}});this.addButton(this._oResetButton)};b.prototype.setShowReset=function(s){this._oResetButton.setVisible(s)};b.prototype.addPanel=function(p){this.addAggregation("panels",p);var B=this._mapPanelToButton(p);p.data(P.CSS_CLASS+"Button",B);if(this._getSegmentedButton()){this._getSegmentedButton().addButton(B)}this._setDialogTitleFor(p);this._setVisibilityOfPanel(p);return this};b.prototype.insertPanel=function(p,i){this.insertAggregation("panels",p,i);var B=this._mapPanelToButton(p);p.data(P.CSS_CLASS+"Button",B);if(this._getSegmentedButton()){this._getSegmentedButton().insertButton(B,i)}this._setDialogTitleFor(p);this._setVisibilityOfPanel(p);return this};b.prototype.removePanel=function(p){p=this.removeAggregation("panels",p);if(this._getSegmentedButton()){this._getSegmentedButton().removeButton(p&&this._getButtonByPanel(p))}return p};b.prototype.removeAllPanels=function(){var p=this.removeAllAggregation("panels");if(this._getSegmentedButton()){this._getSegmentedButton().removeAllButtons()}return p};b.prototype.destroyPanels=function(){this.destroyAggregation("panels");if(this._getSegmentedButton()){this._getSegmentedButton().destroyButtons()}return this};b.prototype._getSegmentedButton=function(){if(this.getPanels().length<2){return null}var t=this;if(!this.getSubHeader()||!this.getSubHeader().getContentLeft().length){this.setSubHeader(new sap.m.Bar({contentLeft:[new sap.m.SegmentedButton({select:function(e){var B=e.getParameter("button");t._switchPanel(B)},width:'100%'})]}));this.getSubHeader().getContentLeft()[0].addButton(this._getButtonByPanel(this.getPanels()[0]))}return this.getSubHeader().getContentLeft()[0]};b.prototype.showValidationDialog=function(c,C,f){var m="";f.forEach(function(p){switch(p){case sap.m.P13nPanelType.filter:m="• "+sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("P13NDIALOG_VALIDATION_MESSAGE")+"\n"+m;break;case sap.m.P13nPanelType.columns:m="• "+sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("P13NDIALOG_VISIBLE_ITEMS_THRESHOLD_MESSAGE")+"\n"+m;break}});q.sap.require("sap.m.MessageBox");sap.m.MessageBox.show(m,{icon:sap.m.MessageBox.Icon.WARNING,title:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("P13NDIALOG_VALIDATION_TITLE"),actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],onClose:function(A){if(A===sap.m.MessageBox.Action.OK){c()}else if(A===sap.m.MessageBox.Action.OK){C()}},styleClass:!!this.$().closest(".sapUiSizeCompact").length?"sapUiSizeCompact":""})};b.prototype._mapPanelToButton=function(p){if(!p){return null}var B=new sap.m.Button({type:sap.m.ButtonType.Default,text:p.getBindingPath("title")?"{"+p.getBindingPath("title")+"}":p.getTitle()});B.setModel(p.getModel());return B};b.prototype._switchPanel=function(B){var p=this._getPanelByButton(B);this.setVerticalScrolling(p.getVerticalScrolling());this.getPanels().forEach(function(o){if(o===p){o.beforeNavigationTo();o.setVisible(true)}else{o.setVisible(false)}},this);this.invalidate();this.rerender()};b.prototype.getVisiblePanel=function(){var p=null;this.getPanels().some(function(o){if(o.getVisible()){p=o;return true}});return p};b.prototype._getPanelByButton=function(B){for(var i=0,p=this.getPanels(),c=p.length;i<c;i++){if(p[i].data(P.CSS_CLASS+"Button")===B){return p[i]}}return null};b.prototype._getButtonByPanel=function(p){if(!p){return null}return p.data(P.CSS_CLASS+"Button")};b.prototype._setVisibilityOfOtherPanels=function(p,v){for(var i=0,c=this.getPanels(),d=c.length;i<d;i++){if(c[i]===p){continue}c[i].setVisible(v)}return null};b.prototype._setVisibilityOfPanel=function(p){var v=this.getInitialVisiblePanelType()===p.getType()||this.getPanels().length===1;if(v){p.beforeNavigationTo()}p.setVisible(v);if(v){this._setVisibilityOfOtherPanels(p,false);this.setVerticalScrolling(p.getVerticalScrolling());var B=this._getButtonByPanel(p);if(this._getSegmentedButton()){this._getSegmentedButton().setSelectedButton(B)}}};b.prototype.onBeforeRendering=function(){D.prototype.onBeforeRendering.apply(this,arguments);if(this.getVisiblePanel()){this.setInitialVisiblePanelType(this.getVisiblePanel().getType())}D.prototype.onBeforeRendering.apply(this,arguments)};b.prototype.onAfterRendering=function(){D.prototype.onAfterRendering.apply(this,arguments);var c=q(this.getFocusDomRef()).find(".sapMDialogScrollCont");var i=this._getVisiblePanelID();if(i&&c){var p=q.find("#"+i);q(p).insertAfter(q(c))}};b.prototype._getVisiblePanelID=function(){var p=this.getVisiblePanel();if(p){return this.getId()+"-panel_"+p.getId()}return null};b.prototype._setDialogTitleFor=function(p){if(this.getPanels().length>1){this.setTitle(this._oResourceBundle.getText("P13NDIALOG_VIEW_SETTINGS"));return}switch(p.getType()){case sap.m.P13nPanelType.filter:this.setTitle(this._oResourceBundle.getText("P13NDIALOG_TITLE_FILTER"));break;case sap.m.P13nPanelType.sort:this.setTitle(this._oResourceBundle.getText("P13NDIALOG_TITLE_SORT"));break;case sap.m.P13nPanelType.group:this.setTitle(this._oResourceBundle.getText("P13NDIALOG_TITLE_GROUP"));break;case sap.m.P13nPanelType.columns:this.setTitle(this._oResourceBundle.getText("P13NDIALOG_TITLE_COLUMNS"));break;default:this.setTitle(this._oResourceBundle.getText("P13NDIALOG_VIEW_SETTINGS"))}};b.prototype.exit=function(){D.prototype.exit.apply(this,arguments)};return b},true);