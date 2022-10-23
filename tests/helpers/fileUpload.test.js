import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name: 'dsyusedf2',
    api_key: '131553626319741',
    api_secret: 'fbEY6zWZBb9DrpbqWTi6EZlbx3s',
    secure:true,
})

describe('File Upload Tests', () => {
    test('should successfully upload the image to cloudinary', async() => {

        const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Hemp-600x600.jpg';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'demo.jpg')

        const url = await fileUpload( file );
        console.log(url);

        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg','');
        await cloudinary.api.delete_resources(['journal/' + imageId]);
    });
    test('should return null', async()=> {
        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );
        expect( url ).toBe( null );
    });
})