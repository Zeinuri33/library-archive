import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UnitPengolahController::index
* @see app/Http/Controllers/UnitPengolahController.php:12
* @route '/unit-pengolah'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/unit-pengolah',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UnitPengolahController::index
* @see app/Http/Controllers/UnitPengolahController.php:12
* @route '/unit-pengolah'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UnitPengolahController::index
* @see app/Http/Controllers/UnitPengolahController.php:12
* @route '/unit-pengolah'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UnitPengolahController::index
* @see app/Http/Controllers/UnitPengolahController.php:12
* @route '/unit-pengolah'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UnitPengolahController::index
* @see app/Http/Controllers/UnitPengolahController.php:12
* @route '/unit-pengolah'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UnitPengolahController::index
* @see app/Http/Controllers/UnitPengolahController.php:12
* @route '/unit-pengolah'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UnitPengolahController::index
* @see app/Http/Controllers/UnitPengolahController.php:12
* @route '/unit-pengolah'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\UnitPengolahController::store
* @see app/Http/Controllers/UnitPengolahController.php:19
* @route '/unit-pengolah'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/unit-pengolah',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UnitPengolahController::store
* @see app/Http/Controllers/UnitPengolahController.php:19
* @route '/unit-pengolah'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UnitPengolahController::store
* @see app/Http/Controllers/UnitPengolahController.php:19
* @route '/unit-pengolah'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UnitPengolahController::store
* @see app/Http/Controllers/UnitPengolahController.php:19
* @route '/unit-pengolah'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UnitPengolahController::store
* @see app/Http/Controllers/UnitPengolahController.php:19
* @route '/unit-pengolah'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\UnitPengolahController::update
* @see app/Http/Controllers/UnitPengolahController.php:32
* @route '/unit-pengolah/{unit}'
*/
export const update = (args: { unit: number | { id: number } } | [unit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/unit-pengolah/{unit}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\UnitPengolahController::update
* @see app/Http/Controllers/UnitPengolahController.php:32
* @route '/unit-pengolah/{unit}'
*/
update.url = (args: { unit: number | { id: number } } | [unit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { unit: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { unit: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            unit: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        unit: typeof args.unit === 'object'
        ? args.unit.id
        : args.unit,
    }

    return update.definition.url
            .replace('{unit}', parsedArgs.unit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UnitPengolahController::update
* @see app/Http/Controllers/UnitPengolahController.php:32
* @route '/unit-pengolah/{unit}'
*/
update.put = (args: { unit: number | { id: number } } | [unit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\UnitPengolahController::update
* @see app/Http/Controllers/UnitPengolahController.php:32
* @route '/unit-pengolah/{unit}'
*/
const updateForm = (args: { unit: number | { id: number } } | [unit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UnitPengolahController::update
* @see app/Http/Controllers/UnitPengolahController.php:32
* @route '/unit-pengolah/{unit}'
*/
updateForm.put = (args: { unit: number | { id: number } } | [unit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\UnitPengolahController::destroy
* @see app/Http/Controllers/UnitPengolahController.php:45
* @route '/unit-pengolah/{unit}'
*/
export const destroy = (args: { unit: number | { id: number } } | [unit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/unit-pengolah/{unit}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\UnitPengolahController::destroy
* @see app/Http/Controllers/UnitPengolahController.php:45
* @route '/unit-pengolah/{unit}'
*/
destroy.url = (args: { unit: number | { id: number } } | [unit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { unit: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { unit: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            unit: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        unit: typeof args.unit === 'object'
        ? args.unit.id
        : args.unit,
    }

    return destroy.definition.url
            .replace('{unit}', parsedArgs.unit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UnitPengolahController::destroy
* @see app/Http/Controllers/UnitPengolahController.php:45
* @route '/unit-pengolah/{unit}'
*/
destroy.delete = (args: { unit: number | { id: number } } | [unit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\UnitPengolahController::destroy
* @see app/Http/Controllers/UnitPengolahController.php:45
* @route '/unit-pengolah/{unit}'
*/
const destroyForm = (args: { unit: number | { id: number } } | [unit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UnitPengolahController::destroy
* @see app/Http/Controllers/UnitPengolahController.php:45
* @route '/unit-pengolah/{unit}'
*/
destroyForm.delete = (args: { unit: number | { id: number } } | [unit: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const UnitPengolahController = { index, store, update, destroy }

export default UnitPengolahController