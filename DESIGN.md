# Design Decisions

## BaseApi

At the core of this project are the individual api classes. Each class is extremely concise thanks to the `BaseApi` class. This class is responsible for providing the individual api classes all of context required to make requests (via axios). It's also designed to be extremely flexible, letting the developer to easily customize things like baseUrl, request headers, and add transformers. I tried to approach this flexibility with composition over further inheritance, though given more time I would like to have improved the developer experience of altering the BaseApi. Here are some examples of how I used this flexible design to implement this specific API.

### Adding Authorization Header

If the apiConfig has an apiKey, the header will automatically be added at the axios instance.

### Handling Failures

This API is a bit unique, in that a "failure" doesn't present itself in the typical fashion of utilizing status codes. This api will just return a completely different contract with a `success: false` and a `message: string`. I use a response transformation to check for this response data type and throw my own error. Because of this, developers can now expect a uniform response and a proper error to be thrown if something goes wrong.

```ts
try {
  const myApi = new MoviesApi(...)

  try {
    await myApi.getBook('not-valid-id')
  } catch(exception) {
    // handle error
  }
}
```

### Pagination, Sorting

Adding support for pagination and sorting was extremely simple for this API. All I did was make sure that "list" endpoints like `moviesApi.getMovies`, takes an optional argument of type `RequestParams<MovieResponse>`. This type breaks down into 3 categories, pagination, sorting, and filtering. This object is passed through to axios as regular query params.

```ts
export type PaginatedRequest = {
  limit?: number,
  page?: number,
  offset?: number,
}
```

```ts
export type SortDirection = 'asc' | 'desc'
export type SortableKeys<T extends Record<PropertyKey, unknown>, K = string & Exclude<keyof T, '_id'>> = K

export type SortRequest<T extends Record<PropertyKey, unknown>> = {
  sort?: `${SortableKeys<T>}:${SortDirection}`,
}
```

### Filtering

Filtering may be part of that RequestParams as a convenience to the developer but it's implementation is quite different. Unfortunately this API uses query parameters that completely break convention so utilizing axios like I did for pagination and sorting was not going to be an option. 

For example, if you want to negate a search term the query should be `?name!='term'`. There is no support for `!=`, and if I tried to put the `!` in with the param name, it would have been correctly url encoded to `%21`. Same goes for many other filter operations like `?budgetInMillions>100`.

My solution to this, is not elegant but I do think it's easy to understand and hopefully maintain. I created a `filterQueryBuilder` function that takes the filter request and simply builds a string array of each query entry and joins them with `&`. Thankfully, axios gracefully handles the presence of query params on the actual route itself in string form (like the filters) and the more proper params object passed as an argument to the `get` method.

## Mapper

I always prefer to separate my own models from the types that I had defined to match the values I get back from individual api calls. Not only does that mean I (and my peers) can have a consistent experience across apis but it also gives me a place to sanitize bad data. In this api the worst offender was the `genderResponse` type on `characterResponse`, which has the following type

```ts
export type GenderResponse =
| 'Female'
| 'Male'
| 'male'
| 'Males'
| 'NaN'
| 'Most likely male'
| undefined
```

Building a good mapping service is extremely difficult in Typescript, but the pattern I implemented here is one I keep coming back to. At it's core it's very simple, each mapping profile is just a function that adheres the the contract `Mapping<Source_type, Destination_type>`. All of the mapping functions come together in a unique `index.ts` file where the structure is

```ts
export const map {
  SOURCE: { 
    DESTINATION_A: mapSourceToDestinationA,
    DESTINATION_B: mapSourceToDestinationB
  }
}
```

Typescript can infer this type effectively and allow me to assemble a mapper where the keys of this object are used as arguments in the mapper call, and the context of the mapper is bound to allow for nesting mapping.This mapping service also gracefully handles data that may or may not be an Array. The end result is syntax like 

```ts
const movie = mapper.map('MovieResponse', data, 'Movie')
```

## Tests

I configured this project to use `jest` for unit testing. I am using `jest-ts` for the first time in this project and ultimately just ran out of time to get good code coverage. I invested a lot in the developer experience, code quality, and robustness of the rest of the project at the detriment of tests, and to a lesser degree documentation. I hope that you'll agree with the value of the rest of the project enough to give me a chance to talk more about my views on testing.
