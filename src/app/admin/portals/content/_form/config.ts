export const ConfigForm  = {

        end_with_newline: true,
        indent_inner_html: true,
        extra_liners: "['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol', 'table', 'dl']",
        brace_style: 'expand',
        indent_char: '\t',
        toolbarButtons: ['alert','inlineClass','fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'quote', 'insertHR', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
        toolbarSticky: false,
        indent_size: 1,
        imageEditButtons: ['imageReplace', 'imageAlign', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize'],
        wrap_line_length: 0,
        paragraphStyles: {
          class1: 'Class 1',
          class2: 'Class 2',
          text_muted: 'text-muted'
        },
        inlineStyles: {
          'text-muted': 'color: #6c757d!important; font-weight: 400; font-family: robotlight; font-size: 18px; font-style: normal;',
          'Small Blue': 'font-size: 14px; color: blue;'
        },
          fontFamily: {
            "Roboto,sans-serif": 'Roboto',
            "Oswald,sans-serif": 'Oswald',
            "Montserrat,sans-serif": 'Montserrat',
            "'Open Sans Condensed',sans-serif": 'Open Sans Condensed'
          },
          fontFamilySelection: true,
          inlineClasses: {
            'row': 'row',
            'fr-class-highlighted': 'Highlighted',
            'fr-class-transparency': 'Transparent'
          },
          imageStyles: {
            "featurette-image img-fluid mx-auto": 'x/y auto',
            "img-fluid mx-auto": 'x auto',
          },

          // enter: `{$.FroalaEditor.ENTER_DIV}`,
          // image get
          requestWithCORS: false,
          requestHeaders: {
            token: `${JSON.parse(localStorage.getItem('currentUser'))}`
          },
          // imageManagerPreloader: "/images/loader.gif",
 
        // Set page size.
        imageManagerPageSize: 20,
 
        // Set a scroll offset (value in pixels).
        imageManagerScrollOffset: 10,
 
        // Set the load images request URL.
        imageManagerLoadURL: "https://karmazdrowia.pl:8080/api/images",
 
        // Set the load images request type.
        imageManagerLoadMethod: "GET",
 
        // Additional load params.
        // imageManagerLoadParams: {user_id: 4219762},
 
        // Set the delete image request URL.
        // imageManagerDeleteURL: "http://example.com/delete_image",
 
        // Set the delete image request type.
        // imageManagerDeleteMethod: "DELETE",
 
        // Additional delete params.
        // imageManagerDeleteParams: {param: 'value'}
        
      
};