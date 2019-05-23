[prestige-of-districts](../README.md) > ["helpers/geolocation/geocodeLocations"](../modules/_helpers_geolocation_geocodelocations_.md)

# External module: "helpers/geolocation/geocodeLocations"

## Index

### Interfaces

* [Location](../interfaces/_helpers_geolocation_geocodelocations_.location.md)
* [Place](../interfaces/_helpers_geolocation_geocodelocations_.place.md)
* [ResultLocations](../interfaces/_helpers_geolocation_geocodelocations_.resultlocations.md)

### Variables

* [configGeocoders](_helpers_geolocation_geocodelocations_.md#configgeocoders)
* [defaultCity](_helpers_geolocation_geocodelocations_.md#defaultcity)
* [defaultCountry](_helpers_geolocation_geocodelocations_.md#defaultcountry)
* [geolocation](_helpers_geolocation_geocodelocations_.md#geolocation)

### Functions

* [OSMGeocoder](_helpers_geolocation_geocodelocations_.md#osmgeocoder)
* [geocodeLocations](_helpers_geolocation_geocodelocations_.md#geocodelocations)
* [hereGeocoder](_helpers_geolocation_geocodelocations_.md#heregeocoder)

---

## Variables

<a id="configgeocoders"></a>

### `<Const>` configGeocoders

**● configGeocoders**: *`object`* =  config.geolocation.geocoders

*Defined in [helpers/geolocation/geocodeLocations.ts:8](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/helpers/geolocation/geocodeLocations.ts#L8)*

#### Type declaration

 here: `object`

 appCode: `string`

 appId: `string`

 openstreetmap: `object`

 addressdetails: `number`

 polygon: `number`

___
<a id="defaultcity"></a>

###  defaultCity

**● defaultCity**: *`string`*

*Defined in [helpers/geolocation/geocodeLocations.ts:7](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/helpers/geolocation/geocodeLocations.ts#L7)*

___
<a id="defaultcountry"></a>

###  defaultCountry

**● defaultCountry**: *`string`*

*Defined in [helpers/geolocation/geocodeLocations.ts:7](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/helpers/geolocation/geocodeLocations.ts#L7)*

___
<a id="geolocation"></a>

###  geolocation

**● geolocation**: *`object`*

*Defined in [helpers/geolocation/geocodeLocations.ts:7](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/helpers/geolocation/geocodeLocations.ts#L7)*

#### Type declaration

 defaultCity: `string`

 defaultCountry: `string`

___

## Functions

<a id="osmgeocoder"></a>

### `<Const>` OSMGeocoder

▸ **OSMGeocoder**(__namedParameters: *`object`*): `Promise`<[ResultLocations](../interfaces/_helpers_geolocation_geocodelocations_.resultlocations.md)>

*Defined in [helpers/geolocation/geocodeLocations.ts:53](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/helpers/geolocation/geocodeLocations.ts#L53)*

Geocode place using OSM API

**Parameters:**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| city | `any` |
| country | `any` |
| place | `any` |

**Returns:** `Promise`<[ResultLocations](../interfaces/_helpers_geolocation_geocodelocations_.resultlocations.md)>

___
<a id="geocodelocations"></a>

### `<Const>` geocodeLocations

▸ **geocodeLocations**(places: *`string`[]*, country?: *`string`*, city?: *`string`*): `Promise`<[Place](../interfaces/_helpers_geolocation_geocodelocations_.place.md)[]>

*Defined in [helpers/geolocation/geocodeLocations.ts:92](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/helpers/geolocation/geocodeLocations.ts#L92)*

Geocode given locations

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| places | `string`[] | - |
| `Default value` country | `string` |  defaultCountry |
| `Default value` city | `string` |  defaultCity |

**Returns:** `Promise`<[Place](../interfaces/_helpers_geolocation_geocodelocations_.place.md)[]>

___
<a id="heregeocoder"></a>

### `<Const>` hereGeocoder

▸ **hereGeocoder**(__namedParameters: *`object`*): `Promise`<[ResultLocations](../interfaces/_helpers_geolocation_geocodelocations_.resultlocations.md)>

*Defined in [helpers/geolocation/geocodeLocations.ts:31](https://github.com/YarosJ/prestige-of-districts/blob/a1ae45e/helpers/geolocation/geocodeLocations.ts#L31)*

Geocode place using here API

**Parameters:**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| city | `any` |
| country | `any` |
| place | `any` |

**Returns:** `Promise`<[ResultLocations](../interfaces/_helpers_geolocation_geocodelocations_.resultlocations.md)>

___

