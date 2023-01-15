# To Run Scripts.
*Install Dependencies* : > $ npm install.
*Prettier*             : > $ npm run prettier.
*Lint*                 : > $ npm run lint.
*Build Project*        : > $ npm run build.
*Jasmine test*         : > $ npm run test.
*Start Server*         : > $ npm run start.

# Server Will Start @ >>>   ***http://localhost:3000/imgapp***
>> and there will be displayed available images
>> you can choose one by click on of them and it will be displayed

# Image Will Display @ >>>   ***http://localhost:3000/imgapp/Image?filename='File Name'***

>> Example : ***http://localhost:3000/imgapp/Image?filename=palmtunnel.jpg***
- now you can write image name with its extension.
- only accept .jpg - extension.
- must be available in *`myorign`* folder.
- original image is in *`(myimage/myorign)`* folder.

# Image Processing
>>> Example : ***http://localhost:3000/imgapp/Image?filename=palmtunnel.jpg&width=500&height=500***
> in order to resize image you must do this.
- provide *both* width and height.
- provide *a valid positive number* for both dimensions.
- provide *number greater than 100* for both dimensions.
- provide *number less than 10000* for both dimensions.
- image will be saved in *`(myimage/mythumb)`* folder and then displayed.

- ###### ##################### END & Thank You ################################################


