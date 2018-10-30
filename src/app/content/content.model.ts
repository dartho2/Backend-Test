export interface Content {
    id: string;
    type: string;
    styles: Styles;
    content: ContentModel;
};
export interface Styles {
    float: string;
    text_type: string;
    list_type: string;

};
export interface ContentModel {
    title: string;
    text: string;
    image: string;
    lead: string;
    signature: string;
    button: string;
    data: string;
    // reference: string;
    // decriptions: string;
};