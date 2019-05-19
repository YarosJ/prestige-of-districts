[prestige-of-districts](../README.md) > ["libs/Scraper/index"](../modules/_libs_scraper_index_.md) > [Scraper](../classes/_libs_scraper_index_.scraper.md)

# Class: Scraper

Scrapes data from given sites by given selectors

## Hierarchy

**Scraper**

## Index

### Properties

* [browser](_libs_scraper_index_.scraper.md#browser)
* [page](_libs_scraper_index_.scraper.md#page)

### Methods

* [closeBrowser](_libs_scraper_index_.scraper.md#closebrowser)
* [getText](_libs_scraper_index_.scraper.md#gettext)
* [goTo](_libs_scraper_index_.scraper.md#goto)
* [openBrowser](_libs_scraper_index_.scraper.md#openbrowser)

---

## Properties

<a id="browser"></a>

###  browser

**● browser**: *`puppeteer.Browser`*

*Defined in [libs/Scraper/index.ts:10](https://github.com/YarosJ/prestige-of-districts/blob/dea42b4/libs/Scraper/index.ts#L10)*

___
<a id="page"></a>

###  page

**● page**: *`puppeteer.Page`*

*Defined in [libs/Scraper/index.ts:12](https://github.com/YarosJ/prestige-of-districts/blob/dea42b4/libs/Scraper/index.ts#L12)*

___

## Methods

<a id="closebrowser"></a>

###  closeBrowser

▸ **closeBrowser**(): `void`

*Defined in [libs/Scraper/index.ts:51](https://github.com/YarosJ/prestige-of-districts/blob/dea42b4/libs/Scraper/index.ts#L51)*

**Returns:** `void`

___
<a id="gettext"></a>

###  getText

▸ **getText**(URL: *`string`*, patches: *`string`[]*): `Promise`<`string`[]>

*Defined in [libs/Scraper/index.ts:26](https://github.com/YarosJ/prestige-of-districts/blob/dea42b4/libs/Scraper/index.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| URL | `string` |
| patches | `string`[] |

**Returns:** `Promise`<`string`[]>

___
<a id="goto"></a>

### `<Protected>` goTo

▸ **goTo**(URL: *`string`*): `Promise`<`puppeteer.Page`>

*Defined in [libs/Scraper/index.ts:55](https://github.com/YarosJ/prestige-of-districts/blob/dea42b4/libs/Scraper/index.ts#L55)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| URL | `string` |

**Returns:** `Promise`<`puppeteer.Page`>

___
<a id="openbrowser"></a>

###  openBrowser

▸ **openBrowser**(): `Promise`<[Scraper](_libs_scraper_index_.scraper.md)>

*Defined in [libs/Scraper/index.ts:14](https://github.com/YarosJ/prestige-of-districts/blob/dea42b4/libs/Scraper/index.ts#L14)*

**Returns:** `Promise`<[Scraper](_libs_scraper_index_.scraper.md)>

___

