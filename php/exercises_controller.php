<?php 
    $rawInput=file_get_contents('php://input');
    $jsonInput=json_decode($rawInput,true);
    $inputFunction=$jsonInput["function"];
    $outputMessage='';

    switch($inputFunction)
    {
        case("testo"):
            {
                $outputMessage="exercises controller is working";
                break;
            }
        case("submitMetadata"):
            {
               
                $params=$jsonInput["params"];
                $figure=$params[0]["input"];
                $title=$params[1]["input"];
                $description=$params[2]["input"];
                $picLocation=$params[3]["input"];
                 $outputMessage="submit metadata control is working".$figure.$title.$description.$picLocation;
                break;
            }
    }
    echo json_encode($outputMessage);
?>