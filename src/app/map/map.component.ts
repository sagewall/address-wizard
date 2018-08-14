import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { loadModules } from 'esri-loader';
import { Address } from '../address';
import esri = __esri;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit, OnChanges {

  private _center: esri.Point;
  private _esriLoaderOptions: object = {};
  private _feature: esri.Graphic | Address;
  private _mapView: esri.MapView;
  private _mapViewProperties: esri.MapViewProperties;
  private _spatialReferenceProperties: esri.SpatialReferenceProperties;
  private _spatialReference: esri.SpatialReference;
  private _webMap: esri.WebMap;
  private _webMapPortalId = '512603d3e03f48c9b2744ef9ac3d7ea2';
  private _webMapProperties: esri.WebMapProperties;
  private _zoom = 15;

  set center(center: esri.Point) {
    this._center = center;
  }

  get center(): esri.Point {
    return this._center;
  }

  set esriLoaderOptions(esriLoaderOptions: object) {
    this._esriLoaderOptions = esriLoaderOptions;
  }

  get esriLoaderOptions(): object {
    return this._esriLoaderOptions;
  }

  @Input()
  set feature(feature: esri.Graphic | Address) {
    this._feature = feature;
  }

  get feature(): esri.Graphic | Address {
    return this._feature;
  }

  set mapView(mapView: esri.MapView) {
    this._mapView = mapView;
  }

  get mapView(): esri.MapView {
    return this._mapView;
  }

  set mapViewProperties(mapViewProperties: esri.MapViewProperties) {
    this._mapViewProperties = mapViewProperties;
  }

  get mapViewProperties(): esri.MapViewProperties {
    return this._mapViewProperties;
  }

  set spatialReferenceProperties(spatialReferenceProperties: esri.SpatialReferenceProperties) {
    this._spatialReferenceProperties = spatialReferenceProperties;
  }

  get spatialReferenceProperties(): esri.SpatialReferenceProperties {
    return this._spatialReferenceProperties;
  }

  set spatialReference(spatialReference: esri.SpatialReference) {
    this._spatialReference = spatialReference;
  }

  get spatialReference(): esri.SpatialReference {
    return this._spatialReference;
  }

  set webMap(webMap: esri.WebMap) {
    this._webMap = webMap;
  }

  get webMap(): esri.WebMap {
    return this._webMap;
  }

  @Input()
  set webMapPortalId(webMapPortalId: string) {
    this._webMapPortalId = webMapPortalId;
  }

  get webMapPortalId(): string {
    return this._webMapPortalId;
  }

  set webMapProperties(webMapProperties: esri.WebMapProperties) {
    this._webMapProperties = webMapProperties;
  }

  get webMapProperties(): esri.WebMapProperties {
    return this._webMapProperties;
  }

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @ViewChild('mapViewNode')
  private mapViewNodeElementRef: ElementRef;

  constructor() {
    this.esriLoaderOptions = {
      url: 'https://js.arcgis.com/4.8/'
    };
  }

  ngOnInit() {
    this.createMapView();
  }

  ngOnChanges() {
    this.createMapView();
  }

  createMapView() {

    loadModules([
      'esri/WebMap',
      'esri/Graphic',
      'esri/geometry/Point',
      'esri/layers/GraphicsLayer',
      'esri/symbols/SimpleMarkerSymbol',
      'esri/views/MapView'

    ], this.esriLoaderOptions)
      .then(([
        WebMap,
        Graphic,
        Point,
        GraphicsLayer,
        SimpleMarkerSymbol,
        MapView
      ]) => {
        this.webMapProperties = {
          portalItem: {
            id: this.webMapPortalId
          }
        };

        this.webMap = new WebMap(this.webMapProperties);


        if (this.feature) {
          const pointProperties: esri.PointProperties = {
            x: -this.feature.attributes['LONGITUDE'],
            y: this.feature.attributes['LATITUDE']
          };
          this.center = new Point(pointProperties);
        }

        this.mapViewProperties = {
          container: this.mapViewNodeElementRef.nativeElement,
          center: this.center,
          rotation: 0,
          zoom: this.zoom,
          map: this.webMap
        };

        this.mapView = new MapView(this.mapViewProperties);

        const simpleMarkerSymbolProperties: esri.SimpleMarkerSymbolProperties = {
          style: 'circle',
          color: [255, 255, 255, 0],
          size: '12px',
          outline: {
            color: [255, 255, 255],
            width: 1
          }
        };
        const simpleMarkerSymbol: esri.SimpleMarkerSymbol = new SimpleMarkerSymbol(simpleMarkerSymbolProperties);

        const graphicProperties: esri.GraphicProperties = {
          geometry: this.center,
          symbol: simpleMarkerSymbol
        };
        const graphic: esri.Graphic = new Graphic(graphicProperties);

        const graphicsLayerProperties: esri.GraphicsLayerProperties = {
          title: 'Target',
          graphics: [graphic]
        };
        const graphicsLayer: esri.GraphicsLayer = new GraphicsLayer(graphicsLayerProperties);

        const targetLayer: esri.Layer = this.mapView.map.allLayers.find(layer => layer.title === 'Target');
        this.mapView.map.remove(targetLayer);
        this.mapView.map.add(graphicsLayer);

      })
      .catch(err => {
        console.error(err);
      });
  }
}
