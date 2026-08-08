import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AgendaController::index
* @see app/Http/Controllers/AgendaController.php:12
* @route '/agenda'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/agenda',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AgendaController::index
* @see app/Http/Controllers/AgendaController.php:12
* @route '/agenda'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AgendaController::index
* @see app/Http/Controllers/AgendaController.php:12
* @route '/agenda'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AgendaController::index
* @see app/Http/Controllers/AgendaController.php:12
* @route '/agenda'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AgendaController::index
* @see app/Http/Controllers/AgendaController.php:12
* @route '/agenda'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AgendaController::index
* @see app/Http/Controllers/AgendaController.php:12
* @route '/agenda'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AgendaController::index
* @see app/Http/Controllers/AgendaController.php:12
* @route '/agenda'
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

const agenda = {
    index: Object.assign(index, index),
}

export default agenda