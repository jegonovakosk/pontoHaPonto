/* eslint-disable react/prop-types */
// src/components/WorkHours.jsx
import { useState, useEffect } from "react";
import { Box, Button, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import {
  getWorkHours,
  postWorkHours,
  putWorkHours,
} from "../../service/working.service";

const WorkHours = ({ dateList, getMonthsAll }) => {
  const [morningEntry, setMorningEntry] = useState(null);
  const [morningExit, setMorningExit] = useState(null);
  const [afternoonEntry, setAfternoonEntry] = useState(null);
  const [afternoonExit, setAfternoonExit] = useState(null);
  const [date, setDate] = useState(null);

  const [formData, setFormData] = useState({
    date: date ? date : "",
    morningStart: "",
    morningEnd: "",
    afternoonStart: "",
    afternoonEnd: "",
  });

  const handleMorningEntry = () => {
    const newformData = {
      ...formData,
      morningStart: morningEntry,
      date: date ? date : new Date().toISOString().split("T")[0],
    }; // Armazena a data atual no formato YYYY-MM-DD
    setFormData((prevFormData) => ({
      ...prevFormData,
      morningStart: morningEntry,
      date: date ? date : new Date().toISOString().split("T")[0], // Armazena a data atual no formato YYYY-MM-DD
    }));
    handleSubmit(newformData);
  };

  const handleMorningExit = () => {
    const newformData = {
      ...formData,
      morningEnd: morningExit,
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      morningEnd: morningExit,
    }));
    handleSubmit(newformData);
  };

  const handleAfternoonEntry = () => {
    const newformData = {
      ...formData,
      afternoonStart: afternoonEntry,
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      afternoonStart: afternoonEntry,
    }));
    handleSubmit(newformData);
  };

  const handleAfternoonExit = () => {
    const newformData = {
      ...formData,
      afternoonEnd: afternoonExit,
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      afternoonEnd: afternoonExit,
    }));
    handleSubmit(newformData);
  };

  const getAllWorkHours = async () => {
    const dateAux = date ? date : new Date().toISOString().split("T")[0];
    const response = await getWorkHours(dateAux);
    if (response.length > 0) {
      setFormData({
        date: response[0].date ? response[0].date.split("T")[0] : "",
        morningStart: response[0].morningStart ? response[0].morningStart : "",
        morningEnd: response[0].morningEnd ? response[0].morningEnd : "",
        afternoonStart: response[0].afternoonStart
          ? response[0].afternoonStart
          : "",
        afternoonEnd: response[0].afternoonEnd ? response[0].afternoonEnd : "",
      });
      setMorningEntry(response[0].morningStart ? response[0].morningStart : "");
      setMorningExit(response[0].morningEnd ? response[0].morningEnd : "");
      setAfternoonEntry(
        response[0].afternoonStart ? response[0].afternoonStart : ""
      );
      setAfternoonExit(
        response[0].afternoonEnd ? response[0].afternoonEnd : ""
      );
    } else {
      setFormData({
        date: "",
        morningStart: "",
        morningEnd: "",
        afternoonStart: "",
        afternoonEnd: "",
      });
      setMorningEntry("");
      setMorningExit("");
      setAfternoonEntry("");
      setAfternoonExit("");
    }
  };

  useEffect(() => {
    getAllWorkHours();
  }, [date]);
  // Use useEffect to log the formData state whenever it updates
  const handleSubmit = (newformData) => {
    if (newformData.morningStart && newformData.morningEnd === "") {
      postHandleApi(newformData);
    } else {
      putHandleApi(newformData);
    }
  };
  const postHandleApi = async (obj) => {
    await postWorkHours(obj);
    getMonthsAll(dateList);
  };
  const putHandleApi = async (obj) => {
    if (formData.morningStart) {
      await putWorkHours(obj);
      getMonthsAll(dateList);
    }
  };

  return (
    <Box
      minWidth="100%"
      mx="auto"
      p={6}
      borderRadius="md"
      boxShadow="md"
      bg="gray.700"
    >
      <Heading color={"#fff"} as="h2" size="lg" mb={6} textAlign="center">
        Registro de Horas
      </Heading>
      <input
        className="input-date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
        <Box>
          <Text color={"#fff"} mb={2}>
            Entrada da Manhã:
          </Text>
          <input
            className="input-date"
            type="time"
            value={morningEntry}
            onChange={(e) => setMorningEntry(e.target.value)}
          />
          <Button colorScheme="teal" onClick={handleMorningEntry} width="100%">
            {morningEntry || "Registrar Hora"}
          </Button>
        </Box>
        <Box>
          <Text color={"#fff"} mb={2}>
            Saída da Manhã:
          </Text>
          <input
            className="input-date"
            type="time"
            value={morningExit}
            onChange={(e) => setMorningExit(e.target.value)}
          />
          <Button colorScheme="teal" onClick={handleMorningExit} width="100%">
            {morningExit || "Registrar Hora"}
          </Button>
        </Box>
        <Box>
          <Text color={"#fff"} mb={2}>
            Entrada da Tarde:
          </Text>
          <input
            className="input-date"
            type="time"
            value={afternoonEntry}
            onChange={(e) => setAfternoonEntry(e.target.value)}
          />
          <Button
            colorScheme="teal"
            onClick={handleAfternoonEntry}
            width="100%"
          >
            {afternoonEntry || "Registrar Hora"}
          </Button>
        </Box>
        <Box>
          <Text color={"#fff"} mb={2}>
            Saída da Tarde:
          </Text>
          <input
            className="input-date"
            type="time"
            value={afternoonExit}
            onChange={(e) => setAfternoonExit(e.target.value)}
          />
          <Button colorScheme="teal" onClick={handleAfternoonExit} width="100%">
            {afternoonExit || "Registrar Hora"}
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default WorkHours;
