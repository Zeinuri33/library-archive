import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TemplateNomorController::index
* @see app/Http/Controllers/TemplateNomorController.php:14
* @route '/template-nomor'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/template-nomor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TemplateNomorController::index
* @see app/Http/Controllers/TemplateNomorController.php:14
* @route '/template-nomor'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TemplateNomorController::index
* @see app/Http/Controllers/TemplateNomorController.php:14
* @route '/template-nomor'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TemplateNomorController::index
* @see app/Http/Controllers/TemplateNomorController.php:14
* @route '/template-nomor'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TemplateNomorController::index
* @see app/Http/Controllers/TemplateNomorController.php:14
* @route '/template-nomor'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TemplateNomorController::index
* @see app/Http/Controllers/TemplateNomorController.php:14
* @route '/template-nomor'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TemplateNomorController::index
* @see app/Http/Controllers/TemplateNomorController.php:14
* @route '/template-nomor'
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
* @see \App\Http\Controllers\TemplateNomorController::store
* @see app/Http/Controllers/TemplateNomorController.php:22
* @route '/template-nomor'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/template-nomor',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TemplateNomorController::store
* @see app/Http/Controllers/TemplateNomorController.php:22
* @route '/template-nomor'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TemplateNomorController::store
* @see app/Http/Controllers/TemplateNomorController.php:22
* @route '/template-nomor'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TemplateNomorController::store
* @see app/Http/Controllers/TemplateNomorController.php:22
* @route '/template-nomor'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TemplateNomorController::store
* @see app/Http/Controllers/TemplateNomorController.php:22
* @route '/template-nomor'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\TemplateNomorController::preview
* @see app/Http/Controllers/TemplateNomorController.php:50
* @route '/template-nomor/preview'
*/
export const preview = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: preview.url(options),
    method: 'post',
})

preview.definition = {
    methods: ["post"],
    url: '/template-nomor/preview',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TemplateNomorController::preview
* @see app/Http/Controllers/TemplateNomorController.php:50
* @route '/template-nomor/preview'
*/
preview.url = (options?: RouteQueryOptions) => {
    return preview.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TemplateNomorController::preview
* @see app/Http/Controllers/TemplateNomorController.php:50
* @route '/template-nomor/preview'
*/
preview.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: preview.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TemplateNomorController::preview
* @see app/Http/Controllers/TemplateNomorController.php:50
* @route '/template-nomor/preview'
*/
const previewForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: preview.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TemplateNomorController::preview
* @see app/Http/Controllers/TemplateNomorController.php:50
* @route '/template-nomor/preview'
*/
previewForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: preview.url(options),
    method: 'post',
})

preview.form = previewForm

/**
* @see \App\Http\Controllers\TemplateNomorController::update
* @see app/Http/Controllers/TemplateNomorController.php:31
* @route '/template-nomor/{template}'
*/
export const update = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/template-nomor/{template}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\TemplateNomorController::update
* @see app/Http/Controllers/TemplateNomorController.php:31
* @route '/template-nomor/{template}'
*/
update.url = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { template: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { template: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            template: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        template: typeof args.template === 'object'
        ? args.template.id
        : args.template,
    }

    return update.definition.url
            .replace('{template}', parsedArgs.template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TemplateNomorController::update
* @see app/Http/Controllers/TemplateNomorController.php:31
* @route '/template-nomor/{template}'
*/
update.put = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TemplateNomorController::update
* @see app/Http/Controllers/TemplateNomorController.php:31
* @route '/template-nomor/{template}'
*/
const updateForm = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TemplateNomorController::update
* @see app/Http/Controllers/TemplateNomorController.php:31
* @route '/template-nomor/{template}'
*/
updateForm.put = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TemplateNomorController::destroy
* @see app/Http/Controllers/TemplateNomorController.php:40
* @route '/template-nomor/{template}'
*/
export const destroy = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/template-nomor/{template}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TemplateNomorController::destroy
* @see app/Http/Controllers/TemplateNomorController.php:40
* @route '/template-nomor/{template}'
*/
destroy.url = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { template: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { template: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            template: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        template: typeof args.template === 'object'
        ? args.template.id
        : args.template,
    }

    return destroy.definition.url
            .replace('{template}', parsedArgs.template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TemplateNomorController::destroy
* @see app/Http/Controllers/TemplateNomorController.php:40
* @route '/template-nomor/{template}'
*/
destroy.delete = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TemplateNomorController::destroy
* @see app/Http/Controllers/TemplateNomorController.php:40
* @route '/template-nomor/{template}'
*/
const destroyForm = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TemplateNomorController::destroy
* @see app/Http/Controllers/TemplateNomorController.php:40
* @route '/template-nomor/{template}'
*/
destroyForm.delete = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const TemplateNomorController = { index, store, preview, update, destroy }

export default TemplateNomorController