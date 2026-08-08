import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DisposisiController::index
* @see app/Http/Controllers/DisposisiController.php:15
* @route '/disposisi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/disposisi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DisposisiController::index
* @see app/Http/Controllers/DisposisiController.php:15
* @route '/disposisi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DisposisiController::index
* @see app/Http/Controllers/DisposisiController.php:15
* @route '/disposisi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DisposisiController::index
* @see app/Http/Controllers/DisposisiController.php:15
* @route '/disposisi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DisposisiController::index
* @see app/Http/Controllers/DisposisiController.php:15
* @route '/disposisi'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DisposisiController::index
* @see app/Http/Controllers/DisposisiController.php:15
* @route '/disposisi'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DisposisiController::index
* @see app/Http/Controllers/DisposisiController.php:15
* @route '/disposisi'
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
* @see \App\Http\Controllers\DisposisiController::store
* @see app/Http/Controllers/DisposisiController.php:31
* @route '/disposisi'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/disposisi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DisposisiController::store
* @see app/Http/Controllers/DisposisiController.php:31
* @route '/disposisi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DisposisiController::store
* @see app/Http/Controllers/DisposisiController.php:31
* @route '/disposisi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DisposisiController::store
* @see app/Http/Controllers/DisposisiController.php:31
* @route '/disposisi'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DisposisiController::store
* @see app/Http/Controllers/DisposisiController.php:31
* @route '/disposisi'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\DisposisiController::update
* @see app/Http/Controllers/DisposisiController.php:57
* @route '/disposisi/{disposisi}'
*/
export const update = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/disposisi/{disposisi}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DisposisiController::update
* @see app/Http/Controllers/DisposisiController.php:57
* @route '/disposisi/{disposisi}'
*/
update.url = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { disposisi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { disposisi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            disposisi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        disposisi: typeof args.disposisi === 'object'
        ? args.disposisi.id
        : args.disposisi,
    }

    return update.definition.url
            .replace('{disposisi}', parsedArgs.disposisi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DisposisiController::update
* @see app/Http/Controllers/DisposisiController.php:57
* @route '/disposisi/{disposisi}'
*/
update.put = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DisposisiController::update
* @see app/Http/Controllers/DisposisiController.php:57
* @route '/disposisi/{disposisi}'
*/
const updateForm = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DisposisiController::update
* @see app/Http/Controllers/DisposisiController.php:57
* @route '/disposisi/{disposisi}'
*/
updateForm.put = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DisposisiController::status
* @see app/Http/Controllers/DisposisiController.php:73
* @route '/disposisi/{disposisi}/status'
*/
export const status = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

status.definition = {
    methods: ["patch"],
    url: '/disposisi/{disposisi}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\DisposisiController::status
* @see app/Http/Controllers/DisposisiController.php:73
* @route '/disposisi/{disposisi}/status'
*/
status.url = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { disposisi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { disposisi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            disposisi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        disposisi: typeof args.disposisi === 'object'
        ? args.disposisi.id
        : args.disposisi,
    }

    return status.definition.url
            .replace('{disposisi}', parsedArgs.disposisi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DisposisiController::status
* @see app/Http/Controllers/DisposisiController.php:73
* @route '/disposisi/{disposisi}/status'
*/
status.patch = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DisposisiController::status
* @see app/Http/Controllers/DisposisiController.php:73
* @route '/disposisi/{disposisi}/status'
*/
const statusForm = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DisposisiController::status
* @see app/Http/Controllers/DisposisiController.php:73
* @route '/disposisi/{disposisi}/status'
*/
statusForm.patch = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

status.form = statusForm

/**
* @see \App\Http\Controllers\DisposisiController::destroy
* @see app/Http/Controllers/DisposisiController.php:84
* @route '/disposisi/{disposisi}'
*/
export const destroy = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/disposisi/{disposisi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DisposisiController::destroy
* @see app/Http/Controllers/DisposisiController.php:84
* @route '/disposisi/{disposisi}'
*/
destroy.url = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { disposisi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { disposisi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            disposisi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        disposisi: typeof args.disposisi === 'object'
        ? args.disposisi.id
        : args.disposisi,
    }

    return destroy.definition.url
            .replace('{disposisi}', parsedArgs.disposisi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DisposisiController::destroy
* @see app/Http/Controllers/DisposisiController.php:84
* @route '/disposisi/{disposisi}'
*/
destroy.delete = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DisposisiController::destroy
* @see app/Http/Controllers/DisposisiController.php:84
* @route '/disposisi/{disposisi}'
*/
const destroyForm = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DisposisiController::destroy
* @see app/Http/Controllers/DisposisiController.php:84
* @route '/disposisi/{disposisi}'
*/
destroyForm.delete = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\DisposisiController::cetak
* @see app/Http/Controllers/DisposisiController.php:91
* @route '/cetak/disposisi/{disposisi}'
*/
export const cetak = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cetak.url(args, options),
    method: 'get',
})

cetak.definition = {
    methods: ["get","head"],
    url: '/cetak/disposisi/{disposisi}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DisposisiController::cetak
* @see app/Http/Controllers/DisposisiController.php:91
* @route '/cetak/disposisi/{disposisi}'
*/
cetak.url = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { disposisi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { disposisi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            disposisi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        disposisi: typeof args.disposisi === 'object'
        ? args.disposisi.id
        : args.disposisi,
    }

    return cetak.definition.url
            .replace('{disposisi}', parsedArgs.disposisi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DisposisiController::cetak
* @see app/Http/Controllers/DisposisiController.php:91
* @route '/cetak/disposisi/{disposisi}'
*/
cetak.get = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cetak.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DisposisiController::cetak
* @see app/Http/Controllers/DisposisiController.php:91
* @route '/cetak/disposisi/{disposisi}'
*/
cetak.head = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cetak.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DisposisiController::cetak
* @see app/Http/Controllers/DisposisiController.php:91
* @route '/cetak/disposisi/{disposisi}'
*/
const cetakForm = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cetak.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DisposisiController::cetak
* @see app/Http/Controllers/DisposisiController.php:91
* @route '/cetak/disposisi/{disposisi}'
*/
cetakForm.get = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cetak.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DisposisiController::cetak
* @see app/Http/Controllers/DisposisiController.php:91
* @route '/cetak/disposisi/{disposisi}'
*/
cetakForm.head = (args: { disposisi: number | { id: number } } | [disposisi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cetak.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

cetak.form = cetakForm

const DisposisiController = { index, store, update, status, destroy, cetak }

export default DisposisiController