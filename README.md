# evan-sutherland-SDK

Typescript SDK for [LOTR API](https://the-one-api.dev/)

## Installation

```bash
npm i evan-sutherland-sdk
```

## Example

```ts
// non-authenticated sdk
const sdk = createSDK()

// authenticated sdk
const sdk = createSDK({
  apiKey: "<API_KEY>"
})
```

non-authenticated sdk can access

- booksApi

authenticated sdk can access

- booksApi
- charactersApi
- moviesApi
- quotesApi

get your API key [here](https://the-one-api.dev/account)

## Pagination

### Pagination Request

```ts
const { books } = createSDK()

books.getBooks({
  limit: 5,
  page: 3,
  offset: 0
})
```

### Pagination Response

```ts
const { books } = createSDK()

const response = books.getBooks()

response.docs   // BookResponse[]
response.limit  // number,
response.offset // number,
response.page   // number,
response.pages  // number,
response.total  // number,
```

## Sort

### Sorting Request

Any key (aside from `_id`) of the underlying type can be sorted asc or desc

```ts
const { books } = createSDK()

books.getBooks({
  sort: 'name: asc'
})
```

## Filtering

### Filtering Request

Any key (aside from `_id`) can be filtered in one of many ways. Each filter operation takes an array, so multiple keys can filtered. Each member of the array is either the single key (`exists` & `notExists`) or a tuple of the key and the search term or search terms.

```ts
const { books } = createSDK()

books.getBooks({
  filter: {
    match: [FilterableKeys<T>, string][],
    negate: [FilterableKeys<T>, string][],
    include: [FilterableKeys<T>, string[]][],
    exclude: [FilterableKeys<T>, string[]][],
    exists: FilterableKeys<T>[],
    notExists: FilterableKeys<T>[],
    regex: [FilterableKeys<T>, RegExp | string][],
    lessThan: [FilterableKeys<T>, number][],
    lessThanOrEqual: [FilterableKeys<T>, number][],
    greaterThan: [FilterableKeys<T>, number][],
    greaterThanOrEqual: [FilterableKeys<T>, number][],
  }
})
```

## Build

This project uses [vite](https://vitejs.dev/)

```bash
npm run build
```

## Test

This project uses [jest](https://jestjs.io/)

```bash
npm run test
```

## Contributing

Ensure correct node version with [nvm](https://github.com/nvm-sh/nvm)

```bash
nvm use
```

Install dependencies

```bash
npm ci
```

Run build with watcher

```bash
npm run dev
```
