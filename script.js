// loading data from Google Sheets - Sheet2 for the modals
$(document).ready(function () {
  $.getJSON(
    "https://sheets.googleapis.com/v4/spreadsheets/1Si8VXjSOf8iYXyvK9ZhjgNOwbzzIN6PNUsQigMaHlsg/values/Sheet2!A2:H10?majorDimension=ROWS&key=AIzaSyCU2x9AShd5qjAZNGCVlVbq1IBVPQAGKwo",
    function (response) {

      // first modal
      $("div.welcome-first").addClass("visible-welcome");

      $("div.welcome-first").html(
        '<div class="welcome-content"><span class="welcome-close-button">X</span><img class="welcome-first-image" src="' + response.values[0][1] + '"><div class="sidebar-content-inner"><h1 class="welcome-popup">Bienvenido al Visor de Cotas/Vertcies del SHOA!</h1><p>' + response.values[0][0] + '</p></div></div><div class="parent-images"></div><div class="sidebar-content-inner"></div><div></div><div class="buildings"></div></div><div class="welcome-button"><div><button class="first-welcome-button">Next</button></div></div>'
      );

      $(".first-welcome-button").on("click", function () {
        $("div.welcome-first").removeClass("visible-welcome");
        $("div.welcome-second").addClass("visible-welcome");
      });

      // second modal
      $("div.welcome-second").html(
        '<div class="welcome-content"><span class="welcome-close-button">X</span><img class="welcome-image" src="' + response.values[0][3] + '"><div class="sidebar-content-inner"><h1 class="welcome-popup">COTA DE MAREA</h1><p>' + response.values[0][2] + '</p></div><div class="parent-images"></div><div class="sidebar-content-inner"></div><div></div></div><div class="previous-next-button"><div><button class="welcome-button second-welcome-previous-button">Atrás</button><button class="welcome-button second-welcome-next-button">Next</button></div></div>'
      );

      $(".second-welcome-previous-button").on("click", function () {
        $("div.welcome-second").removeClass("visible-welcome");
        $("div.welcome-first").addClass("visible-welcome");
      });

      $(".second-welcome-next-button").on("click", function () {
        $("div.welcome-second").removeClass("visible-welcome");
        $("div.welcome-third").addClass("visible-welcome");
      });

      // third modal
      $("div.welcome-third").html(
        '<div class="welcome-content"><span class="welcome-close-button">X</span><img class="welcome-image" src="' + response.values[0][5] + '"><div class="sidebar-content-inner"><h1 class="welcome-popup">VERTICES-GEODESICOS</h1><p>' + response.values[0][4] + '</p></div><div class="parent-images"></div><div class="sidebar-content-inner"></div><div></div></div><div class="previous-next-button"><div><button class="welcome-button third-welcome-previous-button">Back</button><button class="welcome-button third-welcome-next-button">Next</button></div></div>'
      );

      $(".third-welcome-previous-button").on("click", function () {
        $("div.welcome-third").removeClass("visible-welcome");
        $("div.welcome-second").addClass("visible-welcome");
      });

      $(".third-welcome-next-button").on("click", function () {
        $("div.welcome-third").removeClass("visible-welcome");
        $("div.welcome-fourth").addClass("visible-welcome");
      });

      // fourth modal
      $("div.welcome-fourth").html(
        '<div class="welcome-content"><span class="welcome-close-button">X</span><img class="welcome-image" src="' + response.values[0][7] + '"><div class="sidebar-content-inner"><h1 class="welcome-popup">VERTICES GEODESICOS-VNMNM</h1><p>' + response.values[0][6] + '</p></div><div class="parent-images"></div><div class="sidebar-content-inner"></div><div></div></div><div class="previous-next-button"><div><button class="welcome-button fourth-welcome-previous-button">Back</button><button class="welcome-button fourth-welcome-next-button">Next</button></div></div>'
      );

      $(".fourth-welcome-previous-button").on("click", function () {
        $("div.welcome-fourth").removeClass("visible-welcome");
        $("div.welcome-third").addClass("visible-welcome");
      });

      $(".fourth-welcome-next-button").on("click", function () {
        $("div.welcome-fourth").removeClass("visible-welcome");
      });

      $(".welcome-close-button").on("click", function () {
        $("div.visible-welcome").removeClass("visible-welcome");
      });

      $(".button-start-welcome").on("click", function () {
        $("div.welcome-first").addClass("visible-welcome");
      });
    }
  );
});

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5kcmVzYnJjdSIsImEiOiJjbGg5NzAzbGIwMXI4M3BvMnA2MjBnbmp1In0.H-EJGNgjWh64fm7BSGlXrA";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/andresbrcu/clhisf16c01g601qu1v07810s",
  center: [-71.6356, -33.0277],
  zoom: 3,
  preserveDrawingBuffer: true
});

var zoomButton = new mapboxgl.NavigationControl({ showCompass: false });
map.addControl(zoomButton, "top-right");

var windowheight = $(window).height();
var windowWidth = $(window).width();

var allMarkers = [];

var bounds = new mapboxgl.LngLatBounds();

// Add geolocate control to the map.
var geolocate = new mapboxgl.GeolocateControl();

map.addControl(geolocate, "top-right");
var currentUserLocation = "";
geolocate.on("geolocate", function (e) {
  var lon = e.coords.longitude;
  var lat = e.coords.latitude;
  currentUserLocation = [lon, lat];

  setDirection(currentUserLocation, "");

  map.flyTo({
    center: currentUserLocation,
    zoom: 15,
  });
});
// End adding geolcoate control to the map



/* Adding custom control button*/
class MapboxGLButtonControl {
  constructor({ className = "", title = "", eventHandler = evtHndlr }) {
    this._className = className;
    this._title = title;
    this._eventHandler = eventHandler;
  }

  onAdd(map) {
    this._btn = document.createElement("button");
    this._btn.className = "mapboxgl-ctrl-icon" + " " + this._className;
    this._btn.type = "button";
    this._btn.title = this._title;
    this._btn.onclick = this._eventHandler;

    this._container = document.createElement("div");
    this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
    this._container.appendChild(this._btn);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

/* Event Handlers */
function one(event) {
  console.log("View Info")
}

/* Instantiate new controls with custom event handlers */
const ctrlPoint = new MapboxGLButtonControl({
  className: "button-start-welcome",
  title: "View map details",
  eventHandler: one,
});

map.addControl(ctrlPoint, "top-right");

/* end adding custom control button */




/// loading POIs data from Google Sheets table///
$.getJSON(
  "https://sheets.googleapis.com/v4/spreadsheets/1Si8VXjSOf8iYXyvK9ZhjgNOwbzzIN6PNUsQigMaHlsg/values/Sheet1!A2:O3000?majorDimension=ROWS&key=AIzaSyCU2x9AShd5qjAZNGCVlVbq1IBVPQAGKwo",
  function (response) {
    response.values.forEach(function (marker) {
      if (typeof marker[1] !== "undefined") {
        var nombre = marker[5];

        var id = marker[0];

        var fechaCreacion = marker[1];

        var tipoVerti = marker[6]; 

        var region = marker[2]; // Business Type
        var regionSmallLetters = region.toLowerCase().replace(/\s/g, "-");
        var regionSmallLetters = regionSmallLetters.replaceAll(",", "").replaceAll("/", "-").replaceAll("'", "");

        var popupLink = marker[9];
        var popupImage = marker[10];
        var pdfDownloadLink  = marker[11];

        var longitude = parseFloat(marker[12]);
        var latitude = parseFloat(marker[13]);

        // bounds.extend([longitude, latitude]);

        var popupContent = "";

        popupContent += "<div class='title'><b>" +
          nombre +
          "</b></div><hr>";

          popupContent += "<img class='popup-image' src='" + popupImage + "'></br>";

        popupContent += "<p class='property-name'>Tipo Verti : </p><p class='property-value'>" +
          tipoVerti +
          "</p>";

        popupContent += "<div><p class='property-name'>Latitud : </p><p class='property-value'>" +
          latitude +
          "</p></div>";

        popupContent += "<div><p class='property-name'>Longitud : </p><p class='property-value'>" +
          longitude +
          "</p></div>";

        popupContent += "<div><p class='property-name'>Region : </p><p class='property-value'>" +
          region +
          "</p></div>";

        popupContent += "<div><p class='property-name'>Fecha Creacion : </p><p class='property-value'>" +
          fechaCreacion +
          "</p></div>";



          popupContent += "<a target='_blank' id='pdf-download-button' href='" + pdfDownloadLink + "'>Download PDF</a>";

          popupContent += "<a target='_blank' id='general-link-button' href='" + popupLink + "'>More details</a>";

        popup = new mapboxgl.Popup({ closeOnClick: false }).setHTML(
          popupContent
        );

        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "marker";
        el.id = id;
        $(el).attr("data-region", regionSmallLetters);
        $(el).attr("data-tipo-verti", tipoVerti);


        $(el).attr("data-region-visible", "true");
        $(el).attr("data-tipo-verti-visible", "true");

        var markerObj = new mapboxgl.Marker(el)
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(map);

        el.style.backgroundImage = "url(icons/" + tipoVerti + ".svg)";
        // el.style.backgroundImage = "url(icons/COTA.svg)";
        el.style.backgroundColor = "#FFFFFF";

        el.addEventListener("click", (e) => {
          $("#sidebar").empty()

          if (windowWidth > 630) {
            $("#map").css("left", "20%");
            $("#map").css("width", "80%");

            $("#sidebar").css("width", "20%");
            $("#sidebar").css("left", "0");
          } else {
            $("#map").css("left", "0");
            $("#map").css("height", "75%");
            $("#map").css("width", "100%");

            $("#sidebar").css("top", "75%");
            $("#sidebar").css("height", "25%");
            $("#sidebar").css("width", "100%");
          }


          $("#sidebar").append(popupContent);



          flyToStoreOnMarkerClick(markerObj);

          e.stopPropagation();


        });

        // availableTags.push({ label: id, mrkObj: markerObj });
        allMarkers.push({
          tipoVerti: tipoVerti,
          id: id,
          regionSmallLetters: regionSmallLetters,
          nombre: nombre,
          longitude: longitude,
          latitude: latitude,
        });
      }
    });


    // map.fitBounds(bounds, { padding: 100 });


    $(".mapboxgl-canvas").click(function () {

      if (windowWidth > 630) {
        $("#sidebar").css("left", "0");
        $("#sidebar").css("width", "0");
        $("#map").css("width", "100%");
        $("#map").css("left", "0");
      } else {
        $("#map").css("left", "0");
        $("#map").css("height", "100%");
        $("#map").css("width", "100%");

        $("#sidebar").css("top", "0");
        $("#sidebar").css("height", "0");
        $("#sidebar").css("width", "0");
      }


      $(".mapboxgl-popup").remove();
      checkList.classList.remove("visible");
      checkListTwo.classList.remove("visible");
    });
  }
);


//////////////// open/close dropdown menu for Tipo Verti filter
var checkList = document.getElementById("list1");
checkList.getElementsByClassName("anchor")[0].onclick = function (evt) {
  if (checkList.classList.contains("visible"))
    checkList.classList.remove("visible");
  else checkList.classList.add("visible");
};
//////////////

//////////// open/close dropdown menu for Region filter
var checkListTwo = document.getElementById("list2");
checkListTwo.getElementsByClassName("anchor")[0].onclick = function (evt) {
  if (checkListTwo.classList.contains("visible "))
    checkListTwo.classList.remove("visible");
  else checkListTwo.classList.add("visible");
};
////////////////



$("input[type='checkbox'][name='filter-by-region-input']").click(function () {
  var currentRegion = $(this).val();
  if ($(this).is(":checked")) {
    console.log("checked"); // checking values
    $("[data-region='" + currentRegion + "']").each(function (index) {
      $(this).attr("data-region-visible", "true");
      if (
        $(this).attr("data-tipo-verti-visible") === "true"
      ) {
        $(this).css("display", "block");
      }
    });
  } else {
    $("[data-region='" + currentRegion + "']").each(function (index) {
      $(this).attr("data-region-visible", "false");
      $(this).css("display", "none");
    });
  }
});

$("input[type='checkbox'][name='filter-by-tipo-verti-input']").click(function () {
  var currentTipoVerti = $(this).val();
  if ($(this).is(":checked")) {
    console.log("checked"); // checking values
    $("[data-tipo-verti='" + currentTipoVerti + "']").each(function (index) {
      $(this).attr("data-tipo-verti-visible", "true");
      if (
        $(this).attr("data-region-visible") === "true"
      ) {
        $(this).css("display", "block");
      }
    });
  } else {
    $("[data-tipo-verti='" + currentTipoVerti + "']").each(function (index) {
      $(this).attr("data-tipo-verti-visible", "false");
      $(this).css("display", "none");
    });
  }
});


function flyToStoreOnMarkerClick(currentFeature) {
  map.flyTo({
    center: currentFeature["_lngLat"],
    offset: [0, -150],
    // speed: 20,
  });
}

