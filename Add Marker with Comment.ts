/// <reference path="C:/Users/RUI/OneDrive/lib/aftereffects.d.ts/ae.d.ts"/>

(function () {
  const ADBE_MARKER: string = "ADBE Marker";

  const isCompActive = function (comp: CompItem) {
    if (!(comp && comp instanceof CompItem)) {
      return false;
    } else {
      return true;
    }
  }

  const isLayerSelected = function (layers: Layer[]) {
    if (layers.length === 0) {
      return false;
    } else {
      return true;
    }
  }


  const addMarker = function () {
    const actComp: CompItem = <CompItem>app.project.activeItem;
    if (!isCompActive(actComp)) {
      return 0;
    }

    const selLayers: Layer[] = <Layer[]>actComp.selectedLayers;
    if (!isLayerSelected(selLayers)) {
      const compMarkerText: string = prompt("Comment\nComp", "", "Add Marker with Comment");
      if (compMarkerText == null) {
        return 0;
      }

      actComp.markerProperty.setValueAtTime(actComp.time, new MarkerValue(compMarkerText));
      return 0;
    }

    const layerMarkerText: string = prompt("Comment\nLayers", "", "Add Marker with Comment");
    if (layerMarkerText == null) {
      return 0;
    }

    let curPro: Property;
    for (let selLayer of selLayers) {
      curPro = <Property>selLayer.property(ADBE_MARKER);
      curPro.setValueAtTime(actComp.time, new MarkerValue(layerMarkerText));
    }

    return 0;
  }

  app.beginUndoGroup("Add Marker with Comment");
  addMarker();
  app.endUndoGroup();

}).call(this);
