export interface Content {
    _id: string;
    type: string;
    styles: Styles;
    tags: string;
    content: ContentModel;
};

export interface Styles {
    float: string;
    text_type: string;
    list_type: string;
    text_align: string;

};
export interface ContentModel {
    title: string;
    text: string;
    image: string;
    lead: string;
    signature: string;
    button: string;
    data: string;
    reference?: string;
    decriptions: string;
} 