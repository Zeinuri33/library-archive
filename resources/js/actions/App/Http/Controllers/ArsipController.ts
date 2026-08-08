import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ArsipController::index
* @see app/Http/Controllers/ArsipController.php:14
* @route '/arsip'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/arsip',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ArsipController::index
* @see app/Http/Controllers/ArsipController.php:14
* @route '/arsip'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArsipController::index
* @see app/Http/Controllers/ArsipController.php:14
* @route '/arsip'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ArsipController::index
* @see app/Http/Controllers/ArsipController.php:14
* @route '/arsip'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ArsipController::index
* @see app/Http/Controllers/ArsipController.php:14
* @route '/arsip'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ArsipController::index
* @see app/Http/Controllers/ArsipController.php:14
* @route '/arsip'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ArsipController::index
* @see app/Http/Controllers/ArsipController.php:14
* @route '/arsip'
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
* @see \App\Http\Controllers\ArsipController::tandai
* @see app/Http/Controllers/ArsipController.php:35
* @route '/arsip/{surat}'
*/
export const tandai = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: tandai.url(args, options),
    method: 'put',
})

tandai.definition = {
    methods: ["put"],
    url: '/arsip/{surat}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ArsipController::tandai
* @see app/Http/Controllers/ArsipController.php:35
* @route '/arsip/{surat}'
*/
tandai.url = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return tandai.definition.url
            .replace('{surat}', parsedArgs.surat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArsipController::tandai
* @see app/Http/Controllers/ArsipController.php:35
* @route '/arsip/{surat}'
*/
tandai.put = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: tandai.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ArsipController::tandai
* @see app/Http/Controllers/ArsipController.php:35
* @route '/arsip/{surat}'
*/
const tandaiForm = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: tandai.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ArsipController::tandai
* @see app/Http/Controllers/ArsipController.php:35
* @route '/arsip/{surat}'
*/
tandaiForm.put = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: tandai.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

tandai.form = tandaiForm

/**
* @see \App\Http\Controllers\ArsipController::exportMethod
* @see app/Http/Controllers/ArsipController.php:49
* @route '/arsip/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/arsip/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ArsipController::exportMethod
* @see app/Http/Controllers/ArsipController.php:49
* @route '/arsip/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArsipController::exportMethod
* @see app/Http/Controllers/ArsipController.php:49
* @route '/arsip/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ArsipController::exportMethod
* @see app/Http/Controllers/ArsipController.php:49
* @route '/arsip/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ArsipController::exportMethod
* @see app/Http/Controllers/ArsipController.php:49
* @route '/arsip/export'
*/
const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ArsipController::exportMethod
* @see app/Http/Controllers/ArsipController.php:49
* @route '/arsip/export'
*/
exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ArsipController::exportMethod
* @see app/Http/Controllers/ArsipController.php:49
* @route '/arsip/export'
*/
exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportMethod.form = exportMethodForm

const ArsipController = { index, tandai, exportMethod, export: exportMethod }

export default ArsipController