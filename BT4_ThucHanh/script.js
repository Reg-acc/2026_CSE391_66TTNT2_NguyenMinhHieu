ClassicEditor
    .create(document.querySelector('#editor'), {
        toolbar: [
            'heading', '|', 
            'bold', 'italic', 'underline', 'strikethrough', '|',
            'bulletedList', 'numberedList', '|',
            'insertTable', 'link', 'undo', 'redo'
        ],
        table: {
            contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
        }
    })
    .then(editor => {
        console.log('CKEditor 5 đã sẵn sàng!', editor);
    })
    .catch(error => {
        console.error('Có lỗi khi khởi tạo Editor:', error);
    });