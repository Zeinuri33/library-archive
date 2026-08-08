import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\KlasifikasiController::index
* @see app/Http/Controllers/KlasifikasiController.php:12
* @route '/klasifikasi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/klasifikasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KlasifikasiController::index
* @see app/Http/Controllers/KlasifikasiController.php:12
* @route '/klasifikasi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KlasifikasiController::index
* @see app/Http/Controllers/KlasifikasiController.php:12
* @route '/klasifikasi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KlasifikasiController::index
* @see app/Http/Controllers/KlasifikasiController.php:12
* @route '/klasifikasi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KlasifikasiController::index
* @see app/Http/Controllers/KlasifikasiController.php:12
* @route '/klasifikasi'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KlasifikasiController::index
* @see app/Http/Controllers/KlasifikasiController.php:12
* @route '/klasifikasi'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KlasifikasiController::index
* @see app/Http/Controllers/KlasifikasiController.php:12
* @route '/klasifikasi'
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
* @see \App\Http\Controllers\KlasifikasiController::store
* @see app/Http/Controllers/KlasifikasiController.php:19
* @route '/klasifikasi'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/klasifikasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KlasifikasiController::store
* @see app/Http/Controllers/KlasifikasiController.php:19
* @route '/klasifikasi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KlasifikasiController::store
* @see app/Http/Controllers/KlasifikasiController.php:19
* @route '/klasifikasi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KlasifikasiController::store
* @see app/Http/Controllers/KlasifikasiController.php:19
* @route '/klasifikasi'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KlasifikasiController::store
* @see app/Http/Controllers/KlasifikasiController.php:19
* @route '/klasifikasi'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\KlasifikasiController::update
* @see app/Http/Controllers/KlasifikasiController.php:32
* @route '/klasifikasi/{klasifikasi}'
*/
export const update = (args: { klasifikasi: number | { id: number } } | [klasifikasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/klasifikasi/{klasifikasi}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\KlasifikasiController::update
* @see app/Http/Controllers/KlasifikasiController.php:32
* @route '/klasifikasi/{klasifikasi}'
*/
update.url = (args: { klasifikasi: number | { id: number } } | [klasifikasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { klasifikasi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { klasifikasi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            klasifikasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        klasifikasi: typeof args.klasifikasi === 'object'
        ? args.klasifikasi.id
        : args.klasifikasi,
    }

    return update.definition.url
            .replace('{klasifikasi}', parsedArgs.klasifikasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KlasifikasiController::update
* @see app/Http/Controllers/KlasifikasiController.php:32
* @route '/klasifikasi/{klasifikasi}'
*/
update.put = (args: { klasifikasi: number | { id: number } } | [klasifikasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\KlasifikasiController::update
* @see app/Http/Controllers/KlasifikasiController.php:32
* @route '/klasifikasi/{klasifikasi}'
*/
const updateForm = (args: { klasifikasi: number | { id: number } } | [klasifikasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KlasifikasiController::update
* @see app/Http/Controllers/KlasifikasiController.php:32
* @route '/klasifikasi/{klasifikasi}'
*/
updateForm.put = (args: { klasifikasi: number | { id: number } } | [klasifikasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\KlasifikasiController::destroy
* @see app/Http/Controllers/KlasifikasiController.php:45
* @route '/klasifikasi/{klasifikasi}'
*/
export const destroy = (args: { klasifikasi: number | { id: number } } | [klasifikasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/klasifikasi/{klasifikasi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KlasifikasiController::destroy
* @see app/Http/Controllers/KlasifikasiController.php:45
* @route '/klasifikasi/{klasifikasi}'
*/
destroy.url = (args: { klasifikasi: number | { id: number } } | [klasifikasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { klasifikasi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { klasifikasi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            klasifikasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        klasifikasi: typeof args.klasifikasi === 'object'
        ? args.klasifikasi.id
        : args.klasifikasi,
    }

    return destroy.definition.url
            .replace('{klasifikasi}', parsedArgs.klasifikasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KlasifikasiController::destroy
* @see app/Http/Controllers/KlasifikasiController.php:45
* @route '/klasifikasi/{klasifikasi}'
*/
destroy.delete = (args: { klasifikasi: number | { id: number } } | [klasifikasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\KlasifikasiController::destroy
* @see app/Http/Controllers/KlasifikasiController.php:45
* @route '/klasifikasi/{klasifikasi}'
*/
const destroyForm = (args: { klasifikasi: number | { id: number } } | [klasifikasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KlasifikasiController::destroy
* @see app/Http/Controllers/KlasifikasiController.php:45
* @route '/klasifikasi/{klasifikasi}'
*/
destroyForm.delete = (args: { klasifikasi: number | { id: number } } | [klasifikasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const KlasifikasiController = { index, store, update, destroy }

export default KlasifikasiController