import React, { useState, useEffect } from "react";
import {
  articlesList,
  generatePdf,
  getFileMetaData,
  getFilesList,
} from "../services/api";
import Drupal from "../components/Drupal";

const DrupalScreen = () => {
  const [drupalProp, setDrupalProp] = useState([]);
  const [inDesignProp, setInDesignProp] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [allTemplates, setAllTemplates] = useState([]);
  const [hasSelected, setHasSelected] = useState(true);
  useEffect(() => {
    onFetchArticles();
    onFetchIndTemplates();
    getNamesList();
  }, []);

  const onFetchArticles = async () => {
    try {
      const result = await articlesList();
      setDrupalProp(result);
    } catch (err) {
      console.log("onFetchArticles error ::", err);
    }
  };

  //get all templates from the IND server
  const onFetchIndTemplates = async () => {
    try {
      // setAllTemplates(listOfTemplates);
    } catch (err) {}
  };

  //get template details from the IND server
  const onSelectTemplate = async (name) => {
    try {
      setSelectedTemplate(name);
      let response = await getTemplateMeta(name);
      setInDesignProp(response);
    } catch (err) {}
  };

  const getNamesList = async () => {
    try {
      let response = await getFilesList();

      setAllTemplates(response.data);
    } catch (error) {
      console.log("getNamesList ::", error);
    }
  };

  const getTemplateMeta = async (name) => {
    try {
      let response = await getFileMetaData(name);
      if (response.message.toLowerCase() === "file processed successfully") {
        // setInDesignProp([response.data]);
        return response.data;
      }
    } catch (error) {
      console.log("getTemplateMeta error ::", error);
    }
  };

  const generatePdfs = async () => {
    try {
      const data = drupalProp.map((article) => {
        const { title, body, field_genre } = article;
        return {
          arg1: title,
          arg2: body,
          arg3: field_genre || "",
          templateFile: selectedTemplate,
        };
      });
      console.log(data);
      if (data) {
        for (const item of data) {
          let response = await generatePdf(item);
        }
      }
    } catch (error) {
      console.log("generatePdfs ::", error);
    }
  };
  return (
    <Drupal
      drupalProp={drupalProp}
      inDesignProp={inDesignProp}
      selectedTemplate={selectedTemplate}
      allTemplates={allTemplates}
      hasSelected={hasSelected}
      setInDesignProp={setInDesignProp}
      onSelectTemplate={onSelectTemplate}
      generatePdfs={generatePdfs}
      setHasSelected={setHasSelected}
    />
  );
};

export default DrupalScreen;
