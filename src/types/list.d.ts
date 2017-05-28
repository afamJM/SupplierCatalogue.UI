declare const LazyLoad: any;

interface category {
    code: string;
    description: string;
}

interface CategoryResponse extends Response {
    data: {
        categories: category[];
    };
    metaData: {
        limit: number;
        offset: number;
        returned: number;
        total: number;
    };
}
