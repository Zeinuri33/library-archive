import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SuratController::download
* @see app/Http/Controllers/SuratController.php:228
* @route '/lampiran/{lampiran}/download'
*/
export const download = (args: { lampiran: number | { id: number } } | [lampiran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/lampiran/{lampiran}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuratController::download
* @see app/Http/Controllers/SuratController.php:228
* @route '/lampiran/{lampiran}/download'
*/
download.url = (args: { lampiran: number | { id: number } } | [lampiran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lampiran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { lampiran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            lampiran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lampiran: typeof args.lampiran === 'object'
        ? args.lampiran.id
        : args.lampiran,
    }

    return download.definition.url
            .replace('{lampiran}', parsedArgs.lampiran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::download
* @see app/Http/Controllers/SuratController.php:228
* @route '/lampiran/{lampiran}/download'
*/
download.get = (args: { lampiran: number | { id: number } } | [lampiran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::download
* @see app/Http/Controllers/SuratController.php:228
* @route '/lampiran/{lampiran}/download'
*/
download.head = (args: { lampiran: number | { id: number } } | [lampiran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuratController::download
* @see app/Http/Controllers/SuratController.php:228
* @route '/lampiran/{lampiran}/download'
*/
const downloadForm = (args: { lampiran: number | { id: number } } | [lampiran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::download
* @see app/Http/Controllers/SuratController.php:228
* @route '/lampiran/{lampiran}/download'
*/
downloadForm.get = (args: { lampiran: number | { id: number } } | [lampiran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::download
* @see app/Http/Controllers/SuratController.php:228
* @route '/lampiran/{lampiran}/download'
*/
downloadForm.head = (args: { lampiran: number | { id: number } } | [lampiran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

download.form = downloadForm

const lampiran = {
    download: Object.assign(download, download),
}

export default lampiran