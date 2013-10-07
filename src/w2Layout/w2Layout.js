/**
 * 
 */
angular.module("w2LayoutModule", [])
	.controller("w2LayoutCtrl", ["$scope", function(scope){
		'use strict';
		scope.layout = {
				panels : []
		};
		this.addPanel = function(panel){
				scope.layout.panels.push(panel);
			};
	}])
	.controller("testctrl",["$scope", function(scope){
		scope.list = [
		              "hello",
		              "world",
		              "test"
		         ];
		scope.hello = function(thing){
			console.log("Press Button " + thing);
			thing = "changed";
			return thing;
		};
	}])
	.directive("w2Layout", [function(){
		'use strict';
		var linkFunction = function(scope, element, attrs){
			scope.layout.name = attrs.w2Layout;

			element.w2layout(scope.layout);
			
			//if the title is a binded variable
			attrs.$observe("w2Layout", function(value){
				if(scope.layout.name !== value){
					w2ui[scope.layout.name] = w2ui[value];
					w2ui[scope.layout.name] = null;
					scope.layout.name = value;
				}
			});
			
		};
		return{
			restrict:"A",
			scope:false,
			compile: function(elm, attr, link){
				return linkFunction;
			},
			controller: 'w2LayoutCtrl'
		};
	}])
	.directive("w2Panel", ["$compile", function($compile){
		"use strict";
		var linkFunction = function(scope, element, attrs, layoutManager){
			var panel = {
			};
			panel.resizable = attrs.resizable;
			panel.type = attrs.w2Panel;
			
			panel.content = element.contents();
			
			layoutManager.addPanel(panel);
		};
		return{
			restrict:"A",
			require:"^w2Layout",
			compile: function(elm,attr,link){ 
				return linkFunction;
			}
		};
	}]);