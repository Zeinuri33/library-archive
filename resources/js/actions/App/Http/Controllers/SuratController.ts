import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-masuk'
*/
const index2c7161730317eb8783a9ed00f2d61984 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2c7161730317eb8783a9ed00f2d61984.url(options),
    method: 'get',
})

index2c7161730317eb8783a9ed00f2d61984.definition = {
    methods: ["get","head"],
    url: '/surat-masuk',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-masuk'
*/
index2c7161730317eb8783a9ed00f2d61984.url = (options?: RouteQueryOptions) => {
    return index2c7161730317eb8783a9ed00f2d61984.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-masuk'
*/
index2c7161730317eb8783a9ed00f2d61984.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2c7161730317eb8783a9ed00f2d61984.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-masuk'
*/
index2c7161730317eb8783a9ed00f2d61984.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index2c7161730317eb8783a9ed00f2d61984.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-masuk'
*/
const index2c7161730317eb8783a9ed00f2d61984Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index2c7161730317eb8783a9ed00f2d61984.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-masuk'
*/
index2c7161730317eb8783a9ed00f2d61984Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index2c7161730317eb8783a9ed00f2d61984.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-masuk'
*/
index2c7161730317eb8783a9ed00f2d61984Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index2c7161730317eb8783a9ed00f2d61984.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index2c7161730317eb8783a9ed00f2d61984.form = index2c7161730317eb8783a9ed00f2d61984Form
/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-keluar'
*/
const indexda501cd06569737cc44e5ee1b7a28324 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexda501cd06569737cc44e5ee1b7a28324.url(options),
    method: 'get',
})

indexda501cd06569737cc44e5ee1b7a28324.definition = {
    methods: ["get","head"],
    url: '/surat-keluar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-keluar'
*/
indexda501cd06569737cc44e5ee1b7a28324.url = (options?: RouteQueryOptions) => {
    return indexda501cd06569737cc44e5ee1b7a28324.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-keluar'
*/
indexda501cd06569737cc44e5ee1b7a28324.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexda501cd06569737cc44e5ee1b7a28324.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-keluar'
*/
indexda501cd06569737cc44e5ee1b7a28324.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexda501cd06569737cc44e5ee1b7a28324.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-keluar'
*/
const indexda501cd06569737cc44e5ee1b7a28324Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexda501cd06569737cc44e5ee1b7a28324.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-keluar'
*/
indexda501cd06569737cc44e5ee1b7a28324Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexda501cd06569737cc44e5ee1b7a28324.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::index
* @see app/Http/Controllers/SuratController.php:22
* @route '/surat-keluar'
*/
indexda501cd06569737cc44e5ee1b7a28324Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexda501cd06569737cc44e5ee1b7a28324.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexda501cd06569737cc44e5ee1b7a28324.form = indexda501cd06569737cc44e5ee1b7a28324Form

export const index = {
    '/surat-masuk': index2c7161730317eb8783a9ed00f2d61984,
    '/surat-keluar': indexda501cd06569737cc44e5ee1b7a28324,
}

/**
* @see \App\Http\Controllers\SuratController::store
* @see app/Http/Controllers/SuratController.php:57
* @route '/surat-masuk'
*/
const store2c7161730317eb8783a9ed00f2d61984 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store2c7161730317eb8783a9ed00f2d61984.url(options),
    method: 'post',
})

store2c7161730317eb8783a9ed00f2d61984.definition = {
    methods: ["post"],
    url: '/surat-masuk',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuratController::store
* @see app/Http/Controllers/SuratController.php:57
* @route '/surat-masuk'
*/
store2c7161730317eb8783a9ed00f2d61984.url = (options?: RouteQueryOptions) => {
    return store2c7161730317eb8783a9ed00f2d61984.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::store
* @see app/Http/Controllers/SuratController.php:57
* @route '/surat-masuk'
*/
store2c7161730317eb8783a9ed00f2d61984.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store2c7161730317eb8783a9ed00f2d61984.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SuratController::store
* @see app/Http/Controllers/SuratController.php:57
* @route '/surat-masuk'
*/
const store2c7161730317eb8783a9ed00f2d61984Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store2c7161730317eb8783a9ed00f2d61984.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SuratController::store
* @see app/Http/Controllers/SuratController.php:57
* @route '/surat-masuk'
*/
store2c7161730317eb8783a9ed00f2d61984Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store2c7161730317eb8783a9ed00f2d61984.url(options),
    method: 'post',
})

store2c7161730317eb8783a9ed00f2d61984.form = store2c7161730317eb8783a9ed00f2d61984Form
/**
* @see \App\Http\Controllers\SuratController::store
* @see app/Http/Controllers/SuratController.php:57
* @route '/surat-keluar'
*/
const storeda501cd06569737cc44e5ee1b7a28324 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeda501cd06569737cc44e5ee1b7a28324.url(options),
    method: 'post',
})

storeda501cd06569737cc44e5ee1b7a28324.definition = {
    methods: ["post"],
    url: '/surat-keluar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuratController::store
* @see app/Http/Controllers/SuratController.php:57
* @route '/surat-keluar'
*/
storeda501cd06569737cc44e5ee1b7a28324.url = (options?: RouteQueryOptions) => {
    return storeda501cd06569737cc44e5ee1b7a28324.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::store
* @see app/Http/Controllers/SuratController.php:57
* @route '/surat-keluar'
*/
storeda501cd06569737cc44e5ee1b7a28324.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeda501cd06569737cc44e5ee1b7a28324.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SuratController::store
* @see app/Http/Controllers/SuratController.php:57
* @route '/surat-keluar'
*/
const storeda501cd06569737cc44e5ee1b7a28324Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeda501cd06569737cc44e5ee1b7a28324.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SuratController::store
* @see app/Http/Controllers/SuratController.php:57
* @route '/surat-keluar'
*/
storeda501cd06569737cc44e5ee1b7a28324Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeda501cd06569737cc44e5ee1b7a28324.url(options),
    method: 'post',
})

storeda501cd06569737cc44e5ee1b7a28324.form = storeda501cd06569737cc44e5ee1b7a28324Form

export const store = {
    '/surat-masuk': store2c7161730317eb8783a9ed00f2d61984,
    '/surat-keluar': storeda501cd06569737cc44e5ee1b7a28324,
}

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-masuk/{surat}'
*/
const show916a95f62efbe87af0193f0f57093c7b = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show916a95f62efbe87af0193f0f57093c7b.url(args, options),
    method: 'get',
})

show916a95f62efbe87af0193f0f57093c7b.definition = {
    methods: ["get","head"],
    url: '/surat-masuk/{surat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-masuk/{surat}'
*/
show916a95f62efbe87af0193f0f57093c7b.url = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show916a95f62efbe87af0193f0f57093c7b.definition.url
            .replace('{surat}', parsedArgs.surat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-masuk/{surat}'
*/
show916a95f62efbe87af0193f0f57093c7b.get = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show916a95f62efbe87af0193f0f57093c7b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-masuk/{surat}'
*/
show916a95f62efbe87af0193f0f57093c7b.head = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show916a95f62efbe87af0193f0f57093c7b.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-masuk/{surat}'
*/
const show916a95f62efbe87af0193f0f57093c7bForm = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show916a95f62efbe87af0193f0f57093c7b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-masuk/{surat}'
*/
show916a95f62efbe87af0193f0f57093c7bForm.get = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show916a95f62efbe87af0193f0f57093c7b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-masuk/{surat}'
*/
show916a95f62efbe87af0193f0f57093c7bForm.head = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show916a95f62efbe87af0193f0f57093c7b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show916a95f62efbe87af0193f0f57093c7b.form = show916a95f62efbe87af0193f0f57093c7bForm
/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-keluar/{surat}'
*/
const show6192dcdc3a96460166ffaf8568cd8e97 = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show6192dcdc3a96460166ffaf8568cd8e97.url(args, options),
    method: 'get',
})

show6192dcdc3a96460166ffaf8568cd8e97.definition = {
    methods: ["get","head"],
    url: '/surat-keluar/{surat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-keluar/{surat}'
*/
show6192dcdc3a96460166ffaf8568cd8e97.url = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show6192dcdc3a96460166ffaf8568cd8e97.definition.url
            .replace('{surat}', parsedArgs.surat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-keluar/{surat}'
*/
show6192dcdc3a96460166ffaf8568cd8e97.get = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show6192dcdc3a96460166ffaf8568cd8e97.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-keluar/{surat}'
*/
show6192dcdc3a96460166ffaf8568cd8e97.head = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show6192dcdc3a96460166ffaf8568cd8e97.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-keluar/{surat}'
*/
const show6192dcdc3a96460166ffaf8568cd8e97Form = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show6192dcdc3a96460166ffaf8568cd8e97.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-keluar/{surat}'
*/
show6192dcdc3a96460166ffaf8568cd8e97Form.get = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show6192dcdc3a96460166ffaf8568cd8e97.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::show
* @see app/Http/Controllers/SuratController.php:40
* @route '/surat-keluar/{surat}'
*/
show6192dcdc3a96460166ffaf8568cd8e97Form.head = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show6192dcdc3a96460166ffaf8568cd8e97.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show6192dcdc3a96460166ffaf8568cd8e97.form = show6192dcdc3a96460166ffaf8568cd8e97Form

export const show = {
    '/surat-masuk/{surat}': show916a95f62efbe87af0193f0f57093c7b,
    '/surat-keluar/{surat}': show6192dcdc3a96460166ffaf8568cd8e97,
}

/**
* @see \App\Http\Controllers\SuratController::update
* @see app/Http/Controllers/SuratController.php:137
* @route '/surat-masuk/{surat}'
*/
const update916a95f62efbe87af0193f0f57093c7b = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update916a95f62efbe87af0193f0f57093c7b.url(args, options),
    method: 'put',
})

update916a95f62efbe87af0193f0f57093c7b.definition = {
    methods: ["put"],
    url: '/surat-masuk/{surat}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SuratController::update
* @see app/Http/Controllers/SuratController.php:137
* @route '/surat-masuk/{surat}'
*/
update916a95f62efbe87af0193f0f57093c7b.url = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update916a95f62efbe87af0193f0f57093c7b.definition.url
            .replace('{surat}', parsedArgs.surat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::update
* @see app/Http/Controllers/SuratController.php:137
* @route '/surat-masuk/{surat}'
*/
update916a95f62efbe87af0193f0f57093c7b.put = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update916a95f62efbe87af0193f0f57093c7b.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SuratController::update
* @see app/Http/Controllers/SuratController.php:137
* @route '/surat-masuk/{surat}'
*/
const update916a95f62efbe87af0193f0f57093c7bForm = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update916a95f62efbe87af0193f0f57093c7b.url(args, {
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
update916a95f62efbe87af0193f0f57093c7bForm.put = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update916a95f62efbe87af0193f0f57093c7b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update916a95f62efbe87af0193f0f57093c7b.form = update916a95f62efbe87af0193f0f57093c7bForm
/**
* @see \App\Http\Controllers\SuratController::update
* @see app/Http/Controllers/SuratController.php:137
* @route '/surat-keluar/{surat}'
*/
const update6192dcdc3a96460166ffaf8568cd8e97 = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update6192dcdc3a96460166ffaf8568cd8e97.url(args, options),
    method: 'put',
})

update6192dcdc3a96460166ffaf8568cd8e97.definition = {
    methods: ["put"],
    url: '/surat-keluar/{surat}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SuratController::update
* @see app/Http/Controllers/SuratController.php:137
* @route '/surat-keluar/{surat}'
*/
update6192dcdc3a96460166ffaf8568cd8e97.url = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update6192dcdc3a96460166ffaf8568cd8e97.definition.url
            .replace('{surat}', parsedArgs.surat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::update
* @see app/Http/Controllers/SuratController.php:137
* @route '/surat-keluar/{surat}'
*/
update6192dcdc3a96460166ffaf8568cd8e97.put = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update6192dcdc3a96460166ffaf8568cd8e97.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SuratController::update
* @see app/Http/Controllers/SuratController.php:137
* @route '/surat-keluar/{surat}'
*/
const update6192dcdc3a96460166ffaf8568cd8e97Form = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update6192dcdc3a96460166ffaf8568cd8e97.url(args, {
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
* @route '/surat-keluar/{surat}'
*/
update6192dcdc3a96460166ffaf8568cd8e97Form.put = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update6192dcdc3a96460166ffaf8568cd8e97.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update6192dcdc3a96460166ffaf8568cd8e97.form = update6192dcdc3a96460166ffaf8568cd8e97Form

export const update = {
    '/surat-masuk/{surat}': update916a95f62efbe87af0193f0f57093c7b,
    '/surat-keluar/{surat}': update6192dcdc3a96460166ffaf8568cd8e97,
}

/**
* @see \App\Http\Controllers\SuratController::destroy
* @see app/Http/Controllers/SuratController.php:217
* @route '/surat-masuk/{surat}'
*/
const destroy916a95f62efbe87af0193f0f57093c7b = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy916a95f62efbe87af0193f0f57093c7b.url(args, options),
    method: 'delete',
})

destroy916a95f62efbe87af0193f0f57093c7b.definition = {
    methods: ["delete"],
    url: '/surat-masuk/{surat}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SuratController::destroy
* @see app/Http/Controllers/SuratController.php:217
* @route '/surat-masuk/{surat}'
*/
destroy916a95f62efbe87af0193f0f57093c7b.url = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy916a95f62efbe87af0193f0f57093c7b.definition.url
            .replace('{surat}', parsedArgs.surat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::destroy
* @see app/Http/Controllers/SuratController.php:217
* @route '/surat-masuk/{surat}'
*/
destroy916a95f62efbe87af0193f0f57093c7b.delete = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy916a95f62efbe87af0193f0f57093c7b.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\SuratController::destroy
* @see app/Http/Controllers/SuratController.php:217
* @route '/surat-masuk/{surat}'
*/
const destroy916a95f62efbe87af0193f0f57093c7bForm = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy916a95f62efbe87af0193f0f57093c7b.url(args, {
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
destroy916a95f62efbe87af0193f0f57093c7bForm.delete = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy916a95f62efbe87af0193f0f57093c7b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy916a95f62efbe87af0193f0f57093c7b.form = destroy916a95f62efbe87af0193f0f57093c7bForm
/**
* @see \App\Http\Controllers\SuratController::destroy
* @see app/Http/Controllers/SuratController.php:217
* @route '/surat-keluar/{surat}'
*/
const destroy6192dcdc3a96460166ffaf8568cd8e97 = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy6192dcdc3a96460166ffaf8568cd8e97.url(args, options),
    method: 'delete',
})

destroy6192dcdc3a96460166ffaf8568cd8e97.definition = {
    methods: ["delete"],
    url: '/surat-keluar/{surat}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SuratController::destroy
* @see app/Http/Controllers/SuratController.php:217
* @route '/surat-keluar/{surat}'
*/
destroy6192dcdc3a96460166ffaf8568cd8e97.url = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy6192dcdc3a96460166ffaf8568cd8e97.definition.url
            .replace('{surat}', parsedArgs.surat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::destroy
* @see app/Http/Controllers/SuratController.php:217
* @route '/surat-keluar/{surat}'
*/
destroy6192dcdc3a96460166ffaf8568cd8e97.delete = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy6192dcdc3a96460166ffaf8568cd8e97.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\SuratController::destroy
* @see app/Http/Controllers/SuratController.php:217
* @route '/surat-keluar/{surat}'
*/
const destroy6192dcdc3a96460166ffaf8568cd8e97Form = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy6192dcdc3a96460166ffaf8568cd8e97.url(args, {
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
* @route '/surat-keluar/{surat}'
*/
destroy6192dcdc3a96460166ffaf8568cd8e97Form.delete = (args: { surat: number | { id: number } } | [surat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy6192dcdc3a96460166ffaf8568cd8e97.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy6192dcdc3a96460166ffaf8568cd8e97.form = destroy6192dcdc3a96460166ffaf8568cd8e97Form

export const destroy = {
    '/surat-masuk/{surat}': destroy916a95f62efbe87af0193f0f57093c7b,
    '/surat-keluar/{surat}': destroy6192dcdc3a96460166ffaf8568cd8e97,
}

/**
* @see \App\Http\Controllers\SuratController::downloadLampiran
* @see app/Http/Controllers/SuratController.php:228
* @route '/lampiran/{lampiran}/download'
*/
export const downloadLampiran = (args: { lampiran: number | { id: number } } | [lampiran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadLampiran.url(args, options),
    method: 'get',
})

downloadLampiran.definition = {
    methods: ["get","head"],
    url: '/lampiran/{lampiran}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuratController::downloadLampiran
* @see app/Http/Controllers/SuratController.php:228
* @route '/lampiran/{lampiran}/download'
*/
downloadLampiran.url = (args: { lampiran: number | { id: number } } | [lampiran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return downloadLampiran.definition.url
            .replace('{lampiran}', parsedArgs.lampiran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuratController::downloadLampiran
* @see app/Http/Controllers/SuratController.php:228
* @route '/lampiran/{lampiran}/download'
*/
downloadLampiran.get = (args: { lampiran: number | { id: number } } | [lampiran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadLampiran.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::downloadLampiran
* @see app/Http/Controllers/SuratController.php:228
* @route '/lampiran/{lampiran}/download'
*/
downloadLampiran.head = (args: { lampiran: number | { id: number } } | [lampiran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadLampiran.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuratController::downloadLampiran
* @see app/Http/Controllers/SuratController.php:228
* @route '/lampiran/{lampiran}/download'
*/
const downloadLampiranForm = (args: { lampiran: number | { id: number } } | [lampiran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadLampiran.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::downloadLampiran
* @see app/Http/Controllers/SuratController.php:228
* @route '/lampiran/{lampiran}/download'
*/
downloadLampiranForm.get = (args: { lampiran: number | { id: number } } | [lampiran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadLampiran.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuratController::downloadLampiran
* @see app/Http/Controllers/SuratController.php:228
* @route '/lampiran/{lampiran}/download'
*/
downloadLampiranForm.head = (args: { lampiran: number | { id: number } } | [lampiran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadLampiran.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

downloadLampiran.form = downloadLampiranForm

const SuratController = { index, store, show, update, destroy, downloadLampiran }

export default SuratController