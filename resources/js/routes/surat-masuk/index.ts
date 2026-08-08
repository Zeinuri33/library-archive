import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-masuk'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/surat-masuk',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-masuk'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-masuk'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-masuk'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-masuk'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-masuk'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-masuk'
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
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-masuk/{surat}'
*/
export const show = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/surat-masuk/{surat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-masuk/{surat}'
*/
show.url = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { surat: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { surat: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            surat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        surat: typeof args.surat === 'object'
        ? args.surat.id
        : args.surat,
    }

    return show.definition.url
            .replace('{surat}', parsedArgs.surat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-masuk/{surat}'
*/
show.get = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-masuk/{surat}'
*/
show.head = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-masuk/{surat}'
*/
const showForm = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-masuk/{surat}'
*/
showForm.get = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-masuk/{surat}'
*/
showForm.head = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\SuratController::update
* @see app/Http/Controllers/SuratController.php:137
* @route '/surat-masuk/{surat}'
*/
export const update = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/surat-masuk/{surat}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SuratController::update
* @see app/Http/Controllers/SuratController.php:137
* @route '/surat-masuk/{surat}'
*/
update.url = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { surat: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { surat: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            surat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        surat: typeof args.surat === 'object'
        ? args.surat.id
        : args.surat,
    }

    return update.definition.url
            .replace('{surat}', parsedArgs.surat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::update
* @see app/Http/Controllers/SuratController.php:137
* @route '/surat-masuk/{surat}'
*/
update.put = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SuratController::update
* @see app/Http/Controllers/SuratController.php:137
* @route '/surat-masuk/{surat}'
*/
const updateForm = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SuratController::update
* @see app/Http/Controllers/SuratController.php:137
* @route '/surat-masuk/{surat}'
*/
updateForm.put = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\SuratController::destroy
* @see app/Http/Controllers/SuratController.php:217
* @route '/surat-masuk/{surat}'
*/
export const destroy = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/surat-masuk/{surat}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SuratController::destroy
* @see app/Http/Controllers/SuratController.php:217
* @route '/surat-masuk/{surat}'
*/
destroy.url = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { surat: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { surat: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            surat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        surat: typeof args.surat === 'object'
        ? args.surat.id
        : args.surat,
    }

    return destroy.definition.url
            .replace('{surat}', parsedArgs.surat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::destroy
* @see app/Http/Controllers/SuratController.php:217
* @route '/surat-masuk/{surat}'
*/
destroy.delete = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\SuratController::destroy
* @see app/Http/Controllers/SuratController.php:217
* @route '/surat-masuk/{surat}'
*/
const destroyForm = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SuratController::destroy
* @see app/Http/Controllers/SuratController.php:217
* @route '/surat-masuk/{surat}'
*/
destroyForm.delete = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const suratMasuk = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default suratMasuk