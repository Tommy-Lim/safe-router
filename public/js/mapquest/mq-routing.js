MQKEY = Key = 'gLAkDSPytGUZkAqZ0tml8uGE5BH3jp1Z';
MQCONFIGNUMBER = 1;
if (window.MQPROTOCOL === undefined) {
    MQPROTOCOL = window.location.protocol === 'https:'
        ? 'https://'
        : 'http://';
}
MQPLATFORMSERVER = MQPROTOCOL + "www.mapquestapi.com";
MQSTATICSERVER = "https://www.mapquestapi.com/staticmap/";
MQTRAFFSERVER = TRAFFSERVER = "https://www.mapquestapi.com/traffic/";
MQROUTEURL = "https://www.mapquestapi.com/directions/";
MQGEOCODEURL = "https://www.mapquestapi.com/geocoding/";
MQNOMINATIMURL = MQPROTOCOL + "open.mapquestapi.com/";
MQSEARCHURL = "https://www.mapquestapi.com/search/";
MQLONGURL = MQPLATFORMSERVER;
MQSMSURL = MQPLATFORMSERVER;
MQTOOLKIT_VERSION = "v2.2".replace(/^v/, '');
MQCDN = MQIMAGEPATH = "https://api-s.mqcdn.com/" +
    "sdk/leaflet/v2.2/";
MQCDNCOMMON = "https://api-s.mqcdn.com/";
MQICONSERVER = ICONSERVER = MQPROTOCOL + 'icons.mqcdn.com';
MQICONCDN = MQPROTOCOL + 'api.mqcdn.com';
LOGSERVER = MQTILELOGGER = "https://www.mapquestapi.com";
MQLOGURL = "https://www.mapquestapi.com/logger/v1";
COVSERVER = MQCOPYRIGHT = "https://tileproxy.cloud.mapquest.com";
MQCOPYRIGHT_PATH = "/attribution";
MBMAP = "https://{$hostrange}.tiles.mapbox.com/v4/mapquest.streets/{$z}/{$x}/{$y}.{$ext}?access_token=pk.eyJ1IjoibWFwcXVlc3QiLCJhIjoiY2Q2N2RlMmNhY2NiZTRkMzlmZjJmZDk0NWU0ZGJlNTMifQ.mPRiEubbajc6a5y9ISgydg";
MBHYB = "https://{$hostrange}.tiles.mapbox.com/v4/mapquest.satellite/{$z}/{$x}/{$y}.{$ext}?access_token=pk.eyJ1IjoibWFwcXVlc3QiLCJhIjoiY2Q2N2RlMmNhY2NiZTRkMzlmZjJmZDk0NWU0ZGJlNTMifQ.mPRiEubbajc6a5y9ISgydg";
MBSAT = "https://{$hostrange}.tiles.mapbox.com/v4/mapquest.satellitenolabels/{$z}/{$x}/{$y}.{$ext}?access_token=pk.eyJ1IjoibWFwcXVlc3QiLCJhIjoiY2Q2N2RlMmNhY2NiZTRkMzlmZjJmZDk0NWU0ZGJlNTMifQ.mPRiEubbajc6a5y9ISgydg";
MBLIGHT = "https://{$hostrange}.tiles.mapbox.com/v4/mapquest.light/{$z}/{$x}/{$y}.{$ext}?access_token=pk.eyJ1IjoibWFwcXVlc3QiLCJhIjoiY2Q2N2RlMmNhY2NiZTRkMzlmZjJmZDk0NWU0ZGJlNTMifQ.mPRiEubbajc6a5y9ISgydg";
MBDARK = "https://{$hostrange}.tiles.mapbox.com/v4/mapquest.dark/{$z}/{$x}/{$y}.{$ext}?access_token=pk.eyJ1IjoibWFwcXVlc3QiLCJhIjoiY2Q2N2RlMmNhY2NiZTRkMzlmZjJmZDk0NWU0ZGJlNTMifQ.mPRiEubbajc6a5y9ISgydg";
MBMAP_OPEN = "https://{$hostrange}.tiles.mapbox.com/v4/mapquest.streets-mb/{$z}/{$x}/{$y}.{$ext}?access_token=pk.eyJ1IjoibWFwcXVlc3QiLCJhIjoiY2Q2N2RlMmNhY2NiZTRkMzlmZjJmZDk0NWU0ZGJlNTMifQ.mPRiEubbajc6a5y9ISgydg";
MBHYB_OPEN = "https://{$hostrange}.tiles.mapbox.com/v4/mapquest.satellite-mb/{$z}/{$x}/{$y}.{$ext}?access_token=pk.eyJ1IjoibWFwcXVlc3QiLCJhIjoiY2Q2N2RlMmNhY2NiZTRkMzlmZjJmZDk0NWU0ZGJlNTMifQ.mPRiEubbajc6a5y9ISgydg";
MBLIGHT_OPEN = "https://{$hostrange}.tiles.mapbox.com/v4/mapquest.light-mb/{$z}/{$x}/{$y}.{$ext}?access_token=pk.eyJ1IjoibWFwcXVlc3QiLCJhIjoiY2Q2N2RlMmNhY2NiZTRkMzlmZjJmZDk0NWU0ZGJlNTMifQ.mPRiEubbajc6a5y9ISgydg";
MBDARK_OPEN = "https://{$hostrange}.tiles.mapbox.com/v4/mapquest.dark-mb/{$z}/{$x}/{$y}.{$ext}?access_token=pk.eyJ1IjoibWFwcXVlc3QiLCJhIjoiY2Q2N2RlMmNhY2NiZTRkMzlmZjJmZDk0NWU0ZGJlNTMifQ.mPRiEubbajc6a5y9ISgydg";
MBEXT = "png";
MBTILEHI = "4";
MBTILELO = "1";
MBCOPYRIGHT = "https://tileproxy.cloud.mapquest.com";
MBCOPYRIGHT_PATH = "/attribution";
function $pv() {};
function $a() {};

/**
 * MapQuest tiled map toolkit.
 * Copyright 2014, MapQuest Inc.  All Rights Reserved.
 * Copying, reverse engineering, or modification is strictly prohibited.
 * v2.2
 */
"use strict";
MQ.Routing = {};
MQ.Routing.Directions = L.Class.extend({
    includes: L.Mixin.Events,
    options: {
        key: null,
        layer: null
    },
    initialize: function(B) {
        MQ.mapConfig.setAPIKey(this.options);
        L.setOptions(this, B)
    },
    route: function(K) {
        var M = "";
        var I = 4;
        if (K.locations.length > 50) {
            return this.fire("error", {
                info: {
                    statusCode: -999,
                    description: "Too many locations, MAX=50"
                }
            })
        }
        K = this._checkShapeFormat(K);
        K.maxRoutes = parseInt(K.maxRoutes, 10) || 1;
        if (K.maxRoutes > 1 && K.locations.length > 2) {
            return this.fire("error", {
                info: {
                    statusCode: -999,
                    description: "Too many locations (MAX=2) when requesting alternate routes"
                }
            })
        }
        if (!this.noTrim) {
            K.locations = this._trimLocations(K.locations)
        }
        if (MQ.mapConfig.getConfig("configNumber") != I) {
            K.options.conditionsAheadDistance = 200;
            K.options.generalize = 0
        }
        if (K.maxRoutes <= 1) {
            M = "route?key=" + this.options.key
        } else {
            M = "alternateroutes?key=" + this.options.key
        }
        if (K.options.ambiguities) {
            var G = "ignore";
            delete K.options.ambiguities;
            M += "&ambiguities=" + G
        }
        M += "&json=" + MQ.util.stringifyJSON(K);
        var H = this;
        var J = H.routeShapeRequestTime = new Date().getTime();
        MQ.mapConfig.ready(function() {
            MQ.util.doJSONP(MQ.mapConfig.getConfig("directionsAPI") + M, {}, function(A) {
                H._onResult(A, J, "route")
            })
        })
    },
    optimizedRoute: function(H) {
        H = this._checkShapeFormat(H);
        if (!this.noTrim) {
            H.locations = this._trimLocations(H.locations)
        }
        var E = "optimizedroute?key=" + this.options.key;
        E += "&json=" + MQ.util.stringifyJSON(H);
        var F = this;
        var G = F.routeShapeRequestTime = new Date();
        MQ.mapConfig.ready(function() {
            MQ.util.doJSONP(MQ.mapConfig.getConfig("directionsAPI") + E, {}, function(A) {
                F._onResult(A, G, "optimized")
            })
        })
    },
    routeShape: function(H) {
        var E = "";
        H = this._checkShapeFormat(H);
        E = "routeshape?key=" + this.options.key;
        E += "&json=" + MQ.util.stringifyJSON(H);
        var F = this;
        var G = F.routeShapeRequestTime = new Date().getTime();
        MQ.mapConfig.ready(function() {
            MQ.util.doJSONP(MQ.mapConfig.getConfig("directionsAPI") + E, {}, function(A) {
                F._onResult(A, G, "routeShape")
            })
        })
    },
    dragRoute: function(H) {
        H = this._checkShapeFormat(H);
        if (!this.noTrim) {
            H.locations = this._trimLocations(H.locations)
        }
        var E = "dragroute?key=" + this.options.key;
        E += "&json=" + MQ.util.stringifyJSON(H);
        var F = this;
        var G = F.routeShapeRequestTime = new Date().getTime();
        MQ.mapConfig.ready(function() {
            MQ.util.doJSONP(MQ.mapConfig.getConfig("directionsAPI") + E, {}, function(A) {
                F._onResult(A, G, "drag")
            })
        })
    },
    routeMatrix: function(H) {
        var E = "routematrix?key=" + this.options.key;
        E += "&json=" + MQ.util.stringifyJSON(H);
        var F = this;
        var G = F.routeShapeRequestTime = new Date();
        MQ.mapConfig.ready(function() {
            MQ.util.doJSONP(MQ.mapConfig.getConfig("directionsAPI") + E, {}, function(A) {
                F._onResult(A, G, "matrix")
            })
        })
    },
    _checkShapeFormat: function(B) {
        if (B.options && B.options.shapeFormat && B.options.shapeFormat !== "") {
            this.shapeFormat = B.options.shapeFormat;
            return B
        }
        if (!B.options) {
            B.options = {}
        }
        if (!B.options.shapeFormat) {
            B.options.shapeFormat = "cmp6"
        }
        return B
    },
    _onResult: function(Q, O, M) {
        var N = null;
        var J;
        var I;
        var K = [];
        var P;
        if (!Q || !Q.route || (Q.info && Q.info.statuscode !== 0)) {
            if (Q && Q.info) {
                N = {
                    code: Q.info.statuscode,
                    response: Q
                };
                if (Q.info.messages && Q.info.messages.length > 0) {
                    N.message = Q.info.messages[0]
                }
            }
            this.fire("error", N)
        } else {
            J = Q.route.alternateRoutes;
            if (O === this.routeShapeRequestTime) {
                I = this.decompress(Q);
                this.fire("success", I);
                if (M) {
                    this.fire("success:" + M, I)
                }
            }
            if (J) {
                for (P = 0; P < J.length; P++) {
                    I = this.decompress(J[P]);
                    K.push(I);
                    this.fire("altsuccess", I);
                    if (M) {
                        this.fire("altsuccess:" + M, I)
                    }
                }
                this.fire("success:altroutes", K)
            }
        }
    },
    _trimLocations: function(F) {
        if (!F || F.length < 1) {
            return []
        }
        var G;
        var I = 0;
        var H = [];
        for (; I < F.length; I++) {
            G = F[I];
            if (G && G.linkId) {
                var J = {
                    linkId: G.linkId,
                    latLng: {
                        lat: G.latLng.lat,
                        lng: G.latLng.lng
                    },
                    type: G.type
                };
                H.push(J)
            } else {
                H.push(G)
            }
        }
        return H
    },
    decompress: function(N) {
        if (N && N.route && N.route.shape && N.route.shape.shapePoints && N.route.options && (N.route.options.shapeFormat == "cmp" || N.route.options.shapeFormat == "cmp6")) {
            var O = N.route.shape.shapePoints;
            var W = O.length;
            var M = 0;
            var T = 0;
            var S = 0;
            var V = [];
            try {
                while (M < W) {
                    var R;
                    var P = 0;
                    var Q = 0;
                    do
                        {
                            R = O.charCodeAt(M++) - 63;
                        Q |= (R & 31) << P;
                        P += 5
                    } while (R >= 32);
                    T += ((Q & 1) ?~ (Q >> 1) : (Q >> 1));
                    P = 0;
                    Q = 0;
                    do
                        {
                            R = O.charCodeAt(M++) - 63;
                        Q |= (R & 31) << P;
                        P += 5
                    } while (R >= 32);
                    S += ((Q & 1) ?~ (Q >> 1) : (Q >> 1));
                    if (N.route.options.shapeFormat == "cmp") {
                        V.push(new L.LatLng(T * 0.00001, S * 0.00001))
                    } else {
                        V.push(new L.LatLng(T * 0.000001, S * 0.000001))
                    }
                }
            } catch (U) {}
            N.route.shape.shapePoints = V
        }
        return N
    }
});
MQ.routing = {};
MQ.routing.directions = function(B) {
    if (B == null) {
        B = {}
    }
    if (!B.key && MQKEY) {
        B.key = MQKEY
    }
    return new MQ.Routing.Directions(B)
};
"use strict";
MQ.util.loadCSS(".mq-ribbon-popup .leaflet-popup-tip-container{display: none;} .mq-ribbon-popup .leaflet-popup-content-wrapper{border-radius:6px;} .mq-ribbon-popup .leaflet-popup-content-wrapper .leaflet-popup-content{margin:3px 6px;font-size:11px;}");
MQ.Routing.Ribbon = L.LayerGroup.extend({
    includes: L.Mixin.Events,
    _state: "none",
    options: {
        draggable: true,
        selectTime: 1000,
        dragMarker: {
            weight: 1,
            color: "#000000",
            fill: true,
            fillColor: "#ffffff",
            opacity: 0.9,
            fillOpacity: 0.9
        }
    },
    initialize: function(C) {
        L.setOptions(this, C);
        L.LayerGroup.prototype.initialize.call(this, C);
        this._polyline = new L.Polyline([], {
            smoothFactor: 0,
            noClip: true,
            clickable: C.clickable || C.draggable
        });
        this.addLayer(this._polyline);
        if (L.Browser.touch) {
            this._polylineTouchDragProxy = new L.Polyline([], {
                smoothFactor: 0,
                noClip: true,
                clickable: C.clickable || C.draggable
            });
            this.addLayer(this._polylineTouchDragProxy)
        }
        var D = {
            closeButton: false,
            zoomAnimation: false,
            autoPan: false,
            className: "mq-ribbon-popup",
            offset: new L.Point(0, -20, false)
        };
        this._dragPopup = L.popup(D);
        this._dragMarker = new L.CircleMarker(new L.LatLng(0, 0), this.options.dragMarker);
        this._dragMarker.bindPopup(this._dragPopup)
    },
    onAdd: function(B) {
        L.LayerGroup.prototype.onAdd.call(this, B);
        this._polyline.on("mouseover", this._onPathMouseOver, this);
        this._polyline.on("mousemove", this._onPathMouseMove, this);
        this._polyline.on("mouseout", this._onPathMouseOut, this);
        if (this.options.draggable) {
            if (L.Browser.touch) {
                L.DomEvent.on(this._polyline._container, "touchstart", this._onDragStart, this);
                L.DomEvent.on(this._polyline._container, "touchmove", this._onTouchMove, this);
                L.DomEvent.on(this._polyline._container, "touchend", this._onDragEnd, this);
                L.DomEvent.on(this._polyline._container, "touchcancel", this._onDragEnd, this);
                L.DomEvent.on(this._polylineTouchDragProxy._container, "touchstart", this._onDragStart, this);
                L.DomEvent.on(this._polylineTouchDragProxy._container, "touchmove", this._onTouchMove, this);
                L.DomEvent.on(this._polylineTouchDragProxy._container, "touchend", this._onDragEnd, this);
                L.DomEvent.on(this._polylineTouchDragProxy._container, "touchcancel", this._onDragEnd, this)
            }
        } else {
            if (L.Browser.touch) {
                L.DomEvent.on(this._polyline._container, "touchstart", this._onTouchStart, this);
                L.DomEvent.on(this._polyline._container, "touchend", this._onTouchEnd, this)
            }
        }
    },
    onRemove: function(B) {
        L.LayerGroup.prototype.onRemove.call(this, B);
        this._polyline.off("mouseover", this._onPathMouseOver, this);
        this._polyline.off("mousemove", this._onPathMouseMove, this);
        this._polyline.off("mouseout", this._onPathMouseOut, this)
    },
    setLatLngs: function(B) {
        this._polyline.setLatLngs(B);
        if (L.Browser.touch) {
            this._polylineTouchDragProxy.setLatLngs(B)
        }
    },
    setPathStyle: function(C) {
        var D = L.extend({}, C);
        this._polyline.setStyle(C);
        if (L.Browser.touch) {
            D.weight = C.weight * 5 || 50;
            D.opacity = 0;
            this._polylineTouchDragProxy.setStyle(D)
        }
    },
    setVisible: function(B) {
        if (B) {
            this.addLayer(this._polyline)
        } else {
            this.removeLayer(this._polyline)
        }
    },
    bringToFront: function() {
        this._polyline.bringToFront()
    },
    bringToBack: function() {
        this._polyline.bringToBack()
    },
    _clearCancelInterval: function() {
        if (this._cancelInterval) {
            window.clearInterval(this._cancelInterval);
            this._cancelInterval = null
        }
    },
    hideDragMarker: function() {
        this._clearCancelInterval();
        if (this._state == "drag") {
            if (this._map) {
                this._map.off("mousemove", this._onDrag, this);
                this._map.off("mouseup", this._onDragEnd, this)
            }
        }
        this._state = "none"
    },
    closestLayerPoint: function(Q) {
        var U = Infinity;
        var P = this._polyline._parts;
        var S;
        var T;
        var W = null;
        for (var O = 0, R = P.length; O < R; O++) {
            var V = P[O];
            for (var N = 1, X = V.length; N < X; N++) {
                S = V[N - 1];
                T = V[N];
                var Y = L.LineUtil._sqClosestPointOnSegment(Q, S, T, true);
                if (Y < U) {
                    U = Y;
                    W = L.LineUtil._sqClosestPointOnSegment(Q, S, T);
                    W.partIndex = N - 1
                }
            }
        }
        if (W) {
            W.distance = Math.sqrt(U)
        }
        return W
    },
    setHoverDisplay: function(B) {
        B = B || {};
        this.hoverDisplay = L.extend({}, B)
    },
    setHoverMessage: function(B) {},
    copyOrigRoute: function() {
        this.addLayer(L.polyline(this._polyline._latlngs, {color: "#4D4DF3"}))
    },
    getBounds: function() {
        if (this._polyline) {
            return this._polyline.getBounds()
        }
        return null
    },
    _onPathMouseOver: function(B) {
        if (this.options.draggable) {
            this._clearCancelInterval();
            if (this._state == "none") {
                this._state = "hover";
                this._onPathMouseMove(B)
            }
        } else {
            this.origOptions = L.extend({}, this._polyline.options);
            this._polyline.setStyle(this.hoverDisplay);
            this.bringToFront();
            this._polyline.openPopup()
        }
    },
    _onPathMouseOut: function(B) {
        if (this.options.draggable) {
            if (this._state == "hover") {
                this._clearCancelInterval();
                this._cancelInterval = window.setInterval(L.Util.bind(this.hideDragMarker, this), 333)
            }
        } else {
            this.bringToBack();
            this._polyline.setStyle(this.origOptions);
            this._polyline.closePopup()
        }
    },
    _onPathMouseMove: function(F) {
        var D = this.closestLayerPoint(F.layerPoint);
        var E = this._map.layerPointToLatLng(D);
        this._dragShapePointIndex = D.partIndex
    },
    _onMarkerMouseOver: function(B) {
        this._clearCancelInterval()
    },
    _onMarkerMouseOut: function(B) {
        if (this._state == "hover") {
            this._cancelInterval = window.setInterval(L.Util.bind(this.hideDragMarker, this), 333)
        }
    },
    _onDragStart: function(D) {
        if (this._state != "drag") {
            this._state = "drag";
            L.DomEvent.stop(D);
            this.copyOrigRoute();
            if (L.Browser.touch) {
                D.clientX = D.touches[0].clientX;
                D.clientY = D.touches[0].clientY;
                var C = this.closestLayerPoint(this._map.mouseEventToLayerPoint(D));
                D.dragShapePointIndex = C.partIndex
            } else {
                D.dragShapePointIndex = this._dragShapePointIndex;
                this._map.on("mousemove", this._onDrag, this);
                this._map.on("mouseup", this._onDragEnd, this)
            }
            this.fire("dragstart", D)
        }
    },
    _onTouchStart: function(C) {
        var D = this;
        this._isSelected = setTimeout(function() {
            D.fire("selected", D)
        }, this.options.selectTime)
    },
    _onTouchEnd: function() {
        clearTimeout(this._isSelected)
    },
    _onTouchMove: function(B) {
        if (B.touches && B.touches.length > 1) {
            return
        }
        L.DomEvent.preventDefault(B);
        B.clientX = B.touches[0].clientX;
        B.clientY = B.touches[0].clientY;
        B.latlng = this._map.mouseEventToLatLng(B);
        this._onDrag(B)
    },
    _onDrag: function(B) {
        if (this._state == "drag") {
            this.fire("drag", B)
        }
    },
    _onDragEnd: function(B) {
        if (this._state == "drag") {
            this.hideDragMarker();
            this.fire("dragend", B)
        }
    }
});
"use strict";
L.CRS.earthRadius = 6378137;
L.CRS.radians = 0.01745329;
L.CRS.bearing = function(O, I) {
    var K = O.lat * L.CRS.radians;
    var M = I.lat * L.CRS.radians;
    var N = (I.lng - O.lng) * L.CRS.radians;
    var J = Math.sin(N) * Math.cos(M);
    var H = Math.cos(K) * Math.sin(M) - Math.sin(K) * Math.cos(M) * Math.cos(N);
    return Math.atan2(J, H)
};
L.CRS.pointOnLine = function(P, R, N) {
    var O = L.CRS.bearing(P, R);
    var Q = N / L.CRS.earthRadius;
    var M = P.lat * L.CRS.radians;
    var S = P.lng * L.CRS.radians;
    var K = Math.asin(Math.sin(M) * Math.cos(Q) + Math.cos(M) * Math.sin(Q) * Math.cos(O));
    var J = S + Math.atan2(Math.sin(O) * Math.sin(Q) * Math.cos(M), Math.cos(Q) - Math.sin(M) * Math.sin(K));
    return L.latLng(K / L.CRS.radians, J / L.CRS.radians)
};
"use strict";
var DefaultRibbonConstant = ({
    defaultRibbonOpts: {
        draggable: true,
        ribbonDisplay: {
            color: "#5882FA",
            opacity: 0.7
        },
        dragMarker: {
            radius: 80,
            message: "adjust route by dragging it"
        }
    },
    defaultAltRibbonOpts: {
        ribbonDisplay: {
            color: "#AEA690",
            opacity: 0.6
        },
        hoverDisplay: {
            color: "#CCCCCC",
            opacity: 0.6
        }
    },
    trafficRibbonOpts: {
        opacity: 0.6,
        weight: 10,
        lineCap: "butt",
        className: "traffic"
    },
    trafficSeverityColors: {
        "-1": "black",
        0: "green",
        1: "yellow",
        2: "red",
        3: null,
        4: null,
        5: "red",
        6: null
    }
});
var milesToMeters = function(B) {
    return B * 1609.344
};
var polylineOpts = function(C) {
    var D = DefaultRibbonConstant.trafficRibbonOpts;
    D.color = DefaultRibbonConstant.trafficSeverityColors[C];
    return D
};
MQ.Routing.TrafficRibbon = MQ.Routing.Ribbon.extend({
    initialize: function(B) {
        this.disableMouseOverInteractions = false;
        MQ.Routing.Ribbon.prototype.initialize.call(this, B);
        L.setOptions(this._dragPopup, {
            offset: new L.Point(0, -20, false)
        })
    },
    setTraffic: function(B) {
        this.conditionsAhead = B;
        this.distanceFromOrigin = [];
        this.trafficPolylines = [];
        this.genericPolyline = L.polyline([]);
        this.computeDistanceFromOrigin();
        this.makeTrafficPolylines()
    },
    computeDistanceFromOrigin: function() {
        var F = this._polyline.getLatLngs();
        var G;
        var H = 0;
        var E = F.length;
        if (!this.distanceFromOrigin.length) {
            this.distanceFromOrigin[0] = 0;
            for (G = 1; G < E; G++) {
                H += F[G].distanceTo(F[G - 1]);
                this.distanceFromOrigin[G] = H
            }
        }
    },
    getPolylinePoints: function(M, S) {
        var J = this._polyline.getLatLngs();
        var R;
        var N;
        var Q;
        var P;
        var K = J.length;
        var O = [];
        for (R = 1; R < K; R++) {
            if (!N && this.distanceFromOrigin[R] > M) {
                if (this.distanceFromOrigin[R - 1] === M) {
                    O.push(J[R - 1])
                } else {
                    Q = M - this.distanceFromOrigin[R - 1];
                    P = L.CRS.pointOnLine(J[R - 1], J[R], Q);
                    O.push(P)
                }
                N = true
            }
            if (this.distanceFromOrigin[R] > M && this.distanceFromOrigin[R] <= S) {
                O.push(J[R])
            }
            if (this.distanceFromOrigin[R] > S) {
                Q = S - this.distanceFromOrigin[R - 1];
                P = L.CRS.pointOnLine(J[R - 1], J[R], Q);
                O.push(P);
                return O
            }
        }
        return O
    },
    makeTrafficPolylines: function() {
        var S;
        var Q;
        var R = [];
        var N;
        var K = this.conditionsAhead.congestionInfo.length;
        var M = 0;
        var P;
        var O;
        var J = milesToMeters(this.conditionsAhead.length);
        for (S = 0; S < K; S++) {
            Q = this.conditionsAhead.congestionInfo[S];
            O = milesToMeters(Q.length);
            P = M + O;
            N = this.getPolylinePoints(M, P);
            R.push(N);
            M += O;
            this.trafficPolylines.push(L.polyline(N, polylineOpts(Q.severity)))
        }
        if (P < J) {
            M = P;
            P = this.distanceFromOrigin[this.distanceFromOrigin.length - 1];
            N = this.getPolylinePoints(M, P);
            R.push(N);
            this.genericPolyline = L.polyline(N, polylineOpts(0))
        }
    },
    _onPathMouseOver: function(B) {
        if (this.disableMouseOverInteractions) {
            return
        }
    }
});
"use strict";
MQ.Routing.RouteLayer = L.LayerGroup.extend({
    options: {
        key: null,
        draggable: true,
        fitBounds: false,
        routeOptions: {},
        ribbonOptions: {
            widths: [
                10,
                10,
                10,
                10,
                9,
                8,
                7,
                7,
                7,
                6,
                6,
                6,
                6,
                7,
                8,
                9,
                10
            ]
        },
        altRibbonOptions: {
            show: true,
            ribbonDisplay: {
                color: "#F78181",
                opacity: 0.7
            },
            hoverDisplay: {
                color: "red",
                opacity: 0.6
            },
            clickable: true
        }
    },
    includes: L.Mixin.Events,
    ribbonOverscanFactor: 5,
    dragIntervalMs: 333,
    _map: null,
    _altRibbons: [],
    altRouteData: [],
    initialize: function(B) {
        B = B || {};
        MQ.mapConfig.setAPIKey(this.options);
        B.ribbonOptions = L.extend({}, this.options.ribbonOptions, B.ribbonOptions);
        B.altRibbonOptions = L.extend({}, this.options.altRibbonOptions, B.altRibbonOptions);
        B.altRibbonOptions.draggable = false;
        L.setOptions(this, B);
        L.LayerGroup.prototype.initialize.call(this, B);
        this.via = L.marker([
            0, 0
        ], {
            icon: this.viaMarkerIcon(),
            draggable: this.options.draggable
        });
        this.via.on("dragstart", this._onRibbonDragStart, this).on("drag", this._onRibbonDrag, this).on("dragend", this._onRibbonDragEnd, this);
        this.startMarker = L.marker([
            0, 0
        ], {
            icon: this.startMarkerIcon(),
            draggable: this.options.draggable
        });
        this.endMarker = L.marker([
            0, 0
        ], {
            icon: this.endMarkerIcon(),
            draggable: this.options.draggable
        });
        this.directions = this.options.directions || new L.Routing.Directions();
        this.directions.on("success", this._onDirectionsSuccess, this).on("success:altroutes", this._onAllAlternatesSuccess, this).on("altsuccess", this._onAlternateSuccess, this).on("error", this._onDirectionsError, this);
        this.markers = []
    },
    _mousemove: function(J) {
        if (!this.ribbon || !this.hasLayer(this.ribbon) || this._dragLocationIndex !== undefined) {
            return
        }
        var H = this.ribbon.closestLayerPoint(J.layerPoint);
        if (!H || H.distance > 15) {
            return this.removeLayer(this.via)
        }
        var M = this._map.project(J.latlng);
        var I = this._map.project(this.startMarker.getLatLng());
        var N = this._map.project(this.endMarker.getLatLng());
        if (I.distanceTo(M) < 15 || N.distanceTo(M) < 15) {
            return this.removeLayer(this.via)
        }
        for (var K = 0; K < this.markers.length; K++) {
            var O = this._map.project(this.markers[K].getLatLng());
            if (K !== this._dragLocationIndex && O.distanceTo(M) < 15) {
                return this.removeLayer(this.via)
            }
        }
        this.via.setLatLng(this._map.layerPointToLatLng(H));
        this.addLayer(this.via)
    },
    customizeInvisibleRibbon: function(D) {
        var C = {
            opacity: 0,
            weight: 5
        };
        if (this.options.ribbonOptions && this.options.ribbonOptions.ribbonDisplay) {
            C = L.Util.extend(C, this.options.ribbonOptions.ribbonDisplay)
        }
        D.setPathStyle(C)
    },
    customizeRibbon: function(D) {
        var C = {
            color: "#0000ee",
            opacity: 0.6,
            weight: 5
        };
        if (this.options.ribbonOptions && this.options.ribbonOptions.ribbonDisplay) {
            C = L.Util.extend(C, this.options.ribbonOptions.ribbonDisplay)
        }
        D.setPathStyle(C)
    },
    customizeRibbonAtZoom: function(E, F) {
        var D = this.options.ribbonOptions.widths[F - 2];
        if (D && D != E._polyline.options.weight) {
            E.setPathStyle({weight: D})
        }
    },
    createStopMarker: function(H, F) {
        var G = L.icon({
            iconUrl: MQ.mapConfig.getConfig("iconCDN") + "/icons/multi-pin-" + String.fromCharCode(F - 1 + 65).toLowerCase() + ".png",
            iconSize: [
                36, 35
            ],
            iconAnchor: [
                11, 30
            ],
            popupAnchor: [0, -28]
        });
        var E = L.marker(H.latLng, {
            icon: G,
            draggable: this.options.draggable
        }).addTo(this._map);
        return E
    },
    createStartMarker: function(C, D) {
        this.startMarker = this.createStopMarker(C, D);
        return this.startMarker
    },
    createEndMarker: function(C, D) {
        this.endMarker = this.createStopMarker(C, D);
        return this.endMarker
    },
    startMarkerIcon: function() {
        var B = L.icon({
            iconUrl: MQ.mapConfig.getConfig("iconCDN") + "/icons/multi-pin-a.png",
            iconSize: [
                36, 35
            ],
            iconAnchor: [
                11, 30
            ],
            popupAnchor: [0, -28]
        });
        return B
    },
    endMarkerIcon: function() {
        var B = L.icon({
            iconUrl: MQ.mapConfig.getConfig("iconCDN") + "/icons/multi-pin-b.png",
            iconSize: [
                36, 35
            ],
            iconAnchor: [
                11, 30
            ],
            popupAnchor: [0, -28]
        });
        return B
    },
    viaMarkerIcon: function() {
        var B = L.icon({
            iconUrl: MQ.mapConfig.getConfig("iconCDN") + "/icons/via.png",
            iconSize: [
                11, 11
            ],
            iconAnchor: [
                5, 5
            ],
            popupAnchor: [0, -5]
        });
        return B
    },
    removeLocationAt: function(D) {
        var C = this.routeData.locations;
        if (D < 0) {
            return
        }
        if (D >= C.length) {
            return
        }
        if (C.length == 2) {
            return
        }
        C.splice(D, 1);
        this._lastDragLocations = C;
        this.recomputeChangedRoute(C)
    },
    createViaMarker: function(H, F) {
        var G = this.viaMarkerIcon();
        var E = L.marker(H.latLng, {
            icon: G,
            draggable: this.options.draggable
        });
        E.id = F;
        E.on("click", this._removeVia, this);
        return E.addTo(this._map)
    },
    _removeVia: function(B) {
        this.removeLocationAt(B.target.id)
    },
    customizeMarker: function(B) {},
    virtualMapState: function(B) {
        return {
            center: B.getCenter(),
            width: Math.round(this.ribbonOverscanFactor * B.getSize().x),
            height: Math.round(this.ribbonOverscanFactor * B.getSize().y),
            scale: MQ.mapConfig.getScale(B.getZoom())
        }
    },
    recomputeChangedRoute: function(E) {
        var D = {};
        this._clearDragInterval();
        if (this.routeData) {
            D = this.routeData.options;
            this.routeData = null
        }
        var F = {
            mapState: this.virtualMapState(this._map),
            locations: E,
            options: D
        };
        this.directions.route(F)
    },
    onAdd: function(B) {
        L.LayerGroup.prototype.onAdd.call(this, B);
        B.on("move", this._validateMap, this).on("moveend", this._validateMap, this).on("zoomend", this._validateMap, this);
        if (this.options.draggable) {
            B.on("mousemove", this._mousemove, this)
        }
        this.state = "none"
    },
    onRemove: function(B) {
        this._stopDragTimer();
        B.off("move", this._validateMap, this).off("moveend", this._validateMap, this).off("zoomend", this._validateMap, this);
        L.LayerGroup.prototype.onRemove.call(this, B)
    },
    _onDirectionsSuccess: function(D) {
        this.altRouteData = [];
        if (!this.routeData) {
            this.setRouteData(D.route);
            if (this.options.fitBounds && !this._fitBoundsFirstTime) {
                this._fitBoundsFirstTime = false;
                this.fitBounds(this.options.fitBounds)
            }
            this._lastDragLocations = D.route.locations
        } else {
            if (D && D.route && D.route.shape) {
                this._routeShapeCallback(D)
            }
        }
        if (this._lastDragRequest) {
            this._lastDragRequest = null;
            if (D && D.route && D.route.shape && D.route.shape.shapePoints) {
                this._lastDragLocations = D.route.locations;
                for (var E = 0; E < D.route.locations.length; E++) {
                    var F = D.route.locations[E];
                    if (F.dragPoint) {
                        this._setHoverMessage(D.route, F)
                    }
                }
            }
        }
        if (this._nextDragRequest) {
            this._dispatchDragRequest()
        }
    },
    _onAllAlternatesSuccess: function(B) {
        if (this.options.fitBounds && !this._fitBoundsFirstTime) {
            this._fitBoundsFirstTime = false;
            this.fitBounds(this.options.fitBounds)
        }
    },
    _onAlternateSuccess: function(B) {
        if (B && B.route && B.route.shape) {
            this._altRouteShapeCallback(B)
        }
    },
    _onDirectionsError: function(B) {},
    _setHoverMessage: function(R, Q, M) {
        M = M || this.ribbon;
        Q = Q || {
            street: ""
        };
        var K = R.time;
        var N = "";
        var O = R.distance.toFixed(2);
        var T = (R.options.unit.toUpperCase() == "M")
            ? "mi"
            : "km";
        var P = Math.floor(K / 86400).toFixed();
        var S = Math.floor((K / 3600) % 24).toFixed();
        var U = Math.floor((K / 60) % 60).toFixed();
        if (P !== 0) {
            N += P + "d "
        }
        if (S !== 0) {
            N += S + "h "
        }
        if (U !== 0) {
            N += U + "m"
        }
        M.setHoverMessage(Q.street + " (" + O + T + ", " + N + ")")
    },
    setRouteData: function(C) {
        this._clear();
        this.routeData = C;
        try {
            if (C) {
                this._construct(C, C.mapState, C.shape)
            }
        } catch (D) {
            this._clear();
            throw D
        }
    },
    addAltRouteData: function(E, F) {
        var D = L.extend({
            _ribbon: F,
            setVisible: function(A) {
                this._ribbon.setVisible(A)
            }
        }, E);
        this.altRouteData.push(D)
    },
    getBounds: function() {
        var B = null;
        if (this.routeData && this.routeData.boundingBox && this.routeData.boundingBox.ul) {
            B = new L.LatLngBounds(new L.LatLng(this.routeData.boundingBox.lr.lat, this.routeData.boundingBox.ul.lng), new L.LatLng(this.routeData.boundingBox.ul.lat, this.routeData.boundingBox.lr.lng));
            if (this.altRouteData.length) {
                this.altRouteData.forEach(function(A) {
                    if (A.boundingBox && A.boundingBox.ul) {
                        B.extend([A.boundingBox.lr.lat, A.boundingBox.lr.lng]);
                        B.extend([A.boundingBox.ul.lat, A.boundingBox.ul.lng])
                    }
                })
            }
        }
        return B
    },
    fitBounds: function(D) {
        if (this._map && this.routeData) {
            var C = this.getBounds();
            if (C) {
                this._map.fitBounds(C, D)
            }
        }
    },
    _validateMap: function() {
        if (this._ribbonInfo) {
            var D = this._map.getPixelBounds();
            if (this._map.getZoom() != this._ribbonInfo.zoom || !this._ribbonInfo.bounds.contains(D)) {
                if (this.ribbon && this.ribbon.dragPoi) {
                    this.ribbon.hideDragPoi()
                }
                this._schedRibbonUpdate()
            }
        }
        this._validateRibbonAttrs(this.ribbon);
        for (var C = 0; C < this._altRibbons.length; C++) {
            this._validateRibbonAttrs(this._altRibbons[C])
        }
    },
    _validateRibbonAttrs: function(D) {
        if (!D) {
            return
        }
        var C = this._map.getZoom();
        if (D._attrZoom != C) {
            this.customizeRibbonAtZoom(D, C);
            D._attrZoom = C
        }
    },
    _clear: function() {
        this.state = "none";
        this.clearLayers();
        if (this._ribbonInfo && this._ribbonInfo.completion) {
            this._ribbonInfo.completion()
        }
        this.ribbon = null
    },
    _construct: function(H, G, J) {
        this.routeData = H;
        if (H.conditionsAhead) {
            this.ribbon = new MQ.Routing.TrafficRibbon(this.options.ribbonOptions)
        } else {
            this.ribbon = new MQ.Routing.Ribbon(this.options.ribbonOptions)
        }
        this.addLayer(this.ribbon);
        this.customizeRibbon(this.ribbon);
        this._validateRibbonAttrs(this.ribbon);
        this.state = "show";
        if (J) {
            this._ribbonInfo = {
                loaded: true,
                shapeResponse: J
            };
            this._updateRibbonInfo();
            this.ribbon.setLatLngs(J.shapePoints);
            this.ribbon.shapeResponse = J;
            if (!this.ribbon.options.ribbonDisplay) {
                if (H.conditionsAhead) {
                    this.ribbon.setTraffic(H.conditionsAhead);
                    this.ribbon.addLayer(this.ribbon.genericPolyline);
                    this.ribbon.genericPolyline.bringToBack();
                    var F = this.ribbon.trafficPolylines.length;
                    for (var I = 0; I < F; I++) {
                        this.ribbon.addLayer(this.ribbon.trafficPolylines[I]);
                        this.ribbon.trafficPolylines[I].bringToBack()
                    }
                    this.customizeInvisibleRibbon(this.ribbon)
                }
            }
            this.fire("routeRibbonUpdated", this.ribbon);
            this._validateMap()
        } else {
            this._schedRibbonUpdate()
        }
        if (H.locations) {
            this._constructLocations(H.locations)
        }
    },
    _constructLocations: function(H) {
        this.markers = [];
        var N;
        var K = 0;
        var M = 0;
        var O;
        var I;
        for (N = 0; N < H.length; N++) {
            O = H[N];
            switch ((O.type || "").toUpperCase()) {
                case "S":
                    ++K;
                    var J = K - M;
                    if (K === 1) {
                        I = this.createStartMarker(O, J)
                    } else {
                        if (K === H.length) {
                            I = this.createEndMarker(O, J)
                        } else {
                            I = this.createStopMarker(O, J)
                        }
                    }
                    I.stopNumber = J;
                    this.markers.push(I);
                    break;
                case "V":
                    ++K;
                    ++M;
                    I = this.createViaMarker(O, N);
                    this.markers.push(I);
                    break;
                default:
                    console.log("location type: " + O.type + " did not match known type")
            }
            if (!I) {
                continue
            }
            if (O.address && O.address.latLng) {
                O.latLng = O.address.latLng
            }
            I.location = O;
            I.locationIndex = N;
            if (this.options.draggable) {
                I.on("dragstart", this._onMarkerDragStart, this);
                I.on("drag", this._onMarkerDrag, this);
                I.on("dragend", this._onMarkerDragEnd, this)
            }
            this.customizeMarker(I);
            this.addLayer(I)
        }
    },
    _routeShapeCallback: function(E) {
        if (!E || !E.route || !E.route.shape) {
            this._ribbonInfo = null;
            return
        }
        var D = E.route.shape;
        var F = this._ribbonInfo;
        F.loaded = true;
        F.completion = null;
        F.shapeResponse = D;
        if (L.Util.isArray(D.shapePoints)) {
            this.ribbon.setLatLngs(D.shapePoints)
        }
        this.fire("routeRibbonUpdated", this.ribbon);
        this.ribbon.shapeResponse = D
    },
    _altRouteShapeCallback: function(E) {
        if (!E || !E.route || !E.route.shape) {
            this._ribbonInfo = null;
            return
        }
        var D = E.route.shape;
        var F;
        if (L.Util.isArray(D.shapePoints)) {
            F = this._addAltRibbon(D.shapePoints);
            this._setHoverMessage(E.route, null, F)
        }
        this.addAltRouteData(E.route, F)
    },
    _addAltRibbon: function(E) {
        var D = new MQ.Routing.Ribbon(this.options.altRibbonOptions);
        D.setHoverDisplay(this.options.altRibbonOptions.hoverDisplay);
        D.setLatLngs(E);
        D.setPathStyle(this.options.altRibbonOptions.ribbonDisplay);
        D.setVisible(this.options.altRibbonOptions.show);
        this._validateRibbonAttrs(D);
        this._altRibbons.push(D);
        this.addLayer(D);
        this.ribbon.bringToFront();
        this.fire("altRibbonUpdated", D);
        var F = this;
        D.on("selected", function() {
            F.fire("altRibbonSelected", D)
        });
        return D
    },
    _removeAltRibbons: function() {
        var B;
        while (this._altRibbons.length) {
            B = this._altRibbons.pop();
            this.removeLayer(B)
        }
    },
    _schedRibbonUpdate: function() {
        if (this.state != "show") {
            return
        }
        var B = this.virtualMapState(this._map);
        this._ribbonInfo = {
            loaded: false
        };
        this._updateRibbonInfo();
        this._ribbonInfo.completion = this.directions.routeShape({sessionId: this.routeData.sessionId, mapState: B});
        return this._ribbonInfo
    },
    _updateRibbonInfo: function() {
        var J = this._map.getPixelBounds();
        var I = J.getSize().x / 2;
        var M = J.getSize().y / 2;
        var G = J.min;
        G.x += I;
        G.y += M;
        var K = I * this.ribbonOverscanFactor;
        var H = M * this.ribbonOverscanFactor;
        this._ribbonInfo.bounds = new L.Bounds(new L.Point(G.x - K, G.y - H, false), new L.Point(G.x + K, G.y + H, false));
        this._ribbonInfo.zoom = this._map.getZoom()
    },
    _onRibbonDragStart: function(B) {
        this.customizeRibbon(this.ribbon);
        if (B.target === this.via) {
            this._dragLocationIndex = this._findMarkerIndex(B.target.getLatLng())
        } else {
            this._dragLocationIndex = this.markers.indexOf(B.target)
        }
    },
    _onRibbonDrag: function(G) {
        if (this.state != "show") {
            return
        }
        var E = this.routeData.locations.slice();
        var F;
        for (var H = 0; H < E.length; H++) {
            E[H].dragPoint = false
        }
        E.splice(this._dragLocationIndex, 0, {
            latLng: G.target.getLatLng(),
            gefId: 0,
            dragPoint: true,
            type: "v"
        });
        F = {
            options: this.routeData.options,
            locations: E,
            mapState: {
                center: this._map.getCenter(),
                width: Math.round(this._map.getSize().x * 1.25),
                height: Math.round(this._map.getSize().y * 1.25),
                scale: MQ.mapConfig.getScale(this._map.getZoom())
            }
        };
        this._queueDragRequest(F)
    },
    _onRibbonDragEnd: function() {
        this._dragLocationIndex = undefined;
        this.clearDragState();
        if (this._lastDragLocations) {
            this.recomputeChangedRoute(this._lastDragLocations)
        }
    },
    _onMarkerDragStart: function(B) {
        this.fire("markerDragStart", B.target)
    },
    _onMarkerDrag: function(G) {
        var F;
        this.customizeRibbon(this.ribbon);
        this.fire("markerDrag", G.target);
        this._removeAltRibbons();
        if (!this._markerDragging) {
            this.ribbon.copyOrigRoute();
            this._markerDragging = true
        }
        if (this.state != "show") {
            return
        }
        var E = this.routeData.locations.slice();
        for (var H = 0; H < this.routeData.locations.length; H++) {
            E[H].dragPoint = false
        }
        E[G.target.locationIndex] = {
            dragPoint: true,
            latLng: G.target.getLatLng(),
            gefId: 0,
            type: E[G.target.locationIndex].type
        };
        F = {
            options: this.routeData.options,
            locations: E,
            mapState: {
                center: this._map.getCenter(),
                width: Math.round(this._map.getSize().x * 1.25),
                height: Math.round(this._map.getSize().y * 1.25),
                scale: MQ.mapConfig.getScale(this._map.getZoom())
            }
        };
        this._queueDragRequest(F)
    },
    _onMarkerDragEnd: function(B) {
        this.fire("markerDragEnd", B.target);
        this.clearDragState();
        this._markerDragging = false;
        if (this._lastDragLocations) {
            this.recomputeChangedRoute(this._lastDragLocations)
        }
    },
    clearDragState: function() {
        this._stopDragTimer();
        this.state = "show"
    },
    _stopDragTimer: function() {
        this._clearDragInterval();
        this._lastDragRequest = null;
        this._nextDragRequest = null
    },
    _clearDragInterval: function() {
        if (this._dragIntervalId) {
            window.clearInterval(this._dragIntervalId);
            this._dragIntervalId = null
        }
    },
    _queueDragRequest: function(B) {
        this._clearDragInterval();
        this._nextDragRequest = B;
        this._dragIntervalId = window.setInterval(L.Util.bind(this._dispatchDragRequest, this), this.options.dragIntervalMs)
    },
    _dispatchDragRequest: function() {
        if (!this._lastDragRequest && this._nextDragRequest) {
            this._clearDragInterval();
            this._lastDragRequest = this._nextDragRequest;
            this.directions.dragRoute(this._nextDragRequest);
            this._nextDragRequest = null
        }
    },
    _findMarkerIndex: function(F) {
        var G = this._findNearestRouteSegment(F);
        for (var E = 0; E < this.markers.length; E++) {
            var H = this._findNearestRouteSegment(this.markers[E].getLatLng());
            if (H > G) {
                return E
            }
        }
        return this.markers.length - 1
    },
    _findNearestRouteSegment: function(N) {
        var O = Infinity;
        var Q;
        var M = this._map.latLngToLayerPoint(N);
        var J = this.ribbon._polyline._latlngs;
        var I = [];
        for (var P = 0; P < J.length; P++) {
            I.push(this._map.latLngToLayerPoint(J[P]))
        }
        for (P = 1; P < I.length; P++) {
            var K = L.LineUtil._sqClosestPointOnSegment(M, I[P - 1], I[P], true);
            if (K < O) {
                O = K;
                Q = P
            }
        }
        return Q
    }
});
MQ.routing.routeLayer = function(B) {
    if (B == null) {
        B = {}
    }
    if (!B.key && MQKEY) {
        B.key = MQKEY
    }
    return new MQ.Routing.RouteLayer(B)
};
