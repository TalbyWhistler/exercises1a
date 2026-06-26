<?php
/*

    drop table exercisesMeta;
create table exercisesMeta(
    	uuid integer AUTO_INCREMENT PRIMARY KEY,
    	figure varchar(10),
    	title varchar(20),
    	description varchar(100),
    	optionalPicLocation varchar(50)
    );
drop table exercises;
create table exercises(
    	uuid integer AUTO_INCREMENT PRIMARY KEY,
    	figure varchar(10),
    	stepnumber integer,
    	steptext varchar(255)
    );
*/

function insertMetaValues($figure,$title,$description,$picLocation)
{
    include 'db_connect.php';
    $stmt=$conn->prepare("delete from exercisesMeta where figure=?");
    $stmt->bind_param("s",$figure);
    $stmt->execute();
    $outputMessage='';

    $stmt=$conn->prepare("insert into exercisesMeta (figure,title,description,optionalPicLocation) values(?,?,?,?)");
    $stmt->bind_param("ssss",$figure,$title,$description,$picLocation);
    if ($stmt->execute())
        {
            $outputMessage='Record Updated';
        }
        else 
            {
                $outputMessage='Execution Error';
            }
    return $outputMessage;
}

function fetchRecordsList()
{
    include 'db_connect.php';
    $stmt=$conn->prepare("select figure,title from exercisesmeta");
    $stmt->execute();
    $result=$stmt->get_result();
    $outputArray=[];
    if ($result)
        {
            while($row=$result->fetch_assoc())
                {
                    $figure=$row["figure"];
                    $title=$row["title"];
                    $unitArray=['figure'=>$figure,'title'=>$title];
                    array_push($outputArray,$unitArray);
                }
            return $outputArray;
        }
    return $false;
}
?>