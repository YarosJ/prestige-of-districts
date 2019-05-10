export default (id, source) => {
  const MAX_ZOOM_LEVEL = 24;

  return {
    id,
    source,
    maxzoom: MAX_ZOOM_LEVEL,
    type: 'heatmap',
    paint: {
      // Increase the heatmap weight based on frequency and property magnitude
      'heatmap-weight': [
        'interpolate',
        ['linear'],
        ['get', 'mag'],
        1, 0,
        130, 1,
      ],
      // Increase the heatmap color weight weight by zoom level
      // heatmap-intensity is a multiplier on top of heatmap-weight
      'heatmap-intensity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0, 5,
        MAX_ZOOM_LEVEL, 10,
      ],
      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      // Begin color ramp at 0-stop with a 0-transparancy color
      // to create a blur-like effect.
      // 'heatmap-color': [
      //   'interpolate',
      //   ['linear'],
      //   ['heatmap-density'],
      //   0, 'rgba(33,102,172,0)',
      //   0.25, 'rgb(103,169,207)',
      //   0.5, 'rgb(209,229,240)',
      //   0.8, 'rgb(253,219,199)',
      //   1, 'rgb(239,138,98)',
      //   2, 'rgb(178,24,43)',
      // ],
      // Transition from heatmap to circle layer by zoom level
      'heatmap-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        7, 1,
        24, 0,
      ],
      // Adjust the heatmap radius by zoom level
      'heatmap-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        8, 24,
        10, 24,
      ],
    },
  };
};
