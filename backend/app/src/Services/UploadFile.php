<?

namespace App\Services;

class UploadFile
{
    const UPLOAD_DIR = './Public/Uploads/';

    // this get a file from a form and convert it to a string
    public function getFilePath($file): string
    {
        $file = file_get_contents($file);
        return $file;
    }
    
    public function uploadFile(array $file): bool
    {    
        if($file['error'] == 0)
        {
            // get the file name
            $fileName = $file['name'];
            
            // get the file extension
            $fileExt = explode('.', $fileName);
            $fileExt = strtolower(end($fileExt));
            
            // get the file size
            $fileSize = $file['size'];
            
            // get the file temp name
            $fileTempName = $file['tmp_name'];
            
            // get the file error
            $fileError = $file['error'];
            
            // set the allowed file extensions
            $allowed = array('jpg', 'jpeg', 'png');
            
            // check if the file extension is allowed
            if(in_array($fileExt, $allowed))
            {
                // check if there was an error
                if($fileError === 0)
                {
                    // check the file size
                    if($fileSize <= 1000000)
                    {
                        // create a unique file name
                        $fileNewName = uniqid('', true) . '.' . $fileExt;
                        
                        // set the file destination
                        $fileDestination = self::UPLOAD_DIR . $fileNewName;
                        
                        // move the file to the destination and return true if successful
                        return move_uploaded_file($fileTempName, $fileDestination);
                    }
                }
            }
        }
        return false;
    }
}