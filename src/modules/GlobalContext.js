import React, {useState, useEffect} from 'react';


export async function fetcheAllLocations(){
  try {
    let response = await fetch('/voting/locations',{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}
