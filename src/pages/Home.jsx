// src/pages/Home.jsx
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import WorkHours from "../components/RegisterPoint/RegistrarPonto";
import ListWorkHours from "../components/ListregisterPoints/ListWorkHours";
import { useEffect, useState } from "react";
import { months } from "../utils/months";
import { getWorkHoursMonths } from "../service/working.service";

const Home = () => {
  const [arrayList, setArrayList] = useState([]);
  const [dateList, setDateList] = useState({});
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    setCurrentMonthIndex(currentMonth);
    setDateList(months[currentMonth]);
    getMonthsAll(months[currentMonth]);
  }, []);

  const getMonthsAll = async (dateaux) => {
    try {
      const response = await getWorkHoursMonths(dateaux.start, dateaux.end);
      setArrayList(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreviousMonth = () => {
    const newIndex = (currentMonthIndex - 1 + months.length) % months.length;
    setCurrentMonthIndex(newIndex);
    setDateList(months[newIndex]);
    getMonthsAll(months[newIndex]);
  };

  const handleNextMonth = () => {
    const newIndex = (currentMonthIndex + 1) % months.length;
    setCurrentMonthIndex(newIndex);
    setDateList(months[newIndex]);
    getMonthsAll(months[newIndex]);
  };

  const handleCurrentMonth = () => {
    const currentMonth = new Date().getMonth();
    setCurrentMonthIndex(currentMonth);
    setDateList(months[currentMonth]);
    getMonthsAll(months[currentMonth]);
  };

  return (
    <Flex direction="column" minHeight="100vh">
      {/* Header */}
      <Box as="header" bg="teal.500" py={4} px={8} color="white">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="lg">Ponto há Ponto</Heading>
          <Flex>
            <Button
              as={Link}
              to="/"
              variant="ghost"
              colorScheme="gray.500"
              mr={4}
            >
              Home
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* Main Content */}
      <Flex flex="1" direction="column" p={8}>
        <WorkHours getMonthsAll={getMonthsAll} dateList={dateList} />
        <Flex justifyContent="space-between" mt={5} width="100%">
          <Button
            colorScheme="teal"
            onClick={handlePreviousMonth}
            flex="1"
            mr={2}
          >
            {
              months[(currentMonthIndex - 1 + months.length) % months.length]
                .name
            }
          </Button>
          <Button
            colorScheme="orange"
            onClick={handleCurrentMonth}
            flex="1"
            mx={2}
          >
            {months[currentMonthIndex].name}
          </Button>
          <Button colorScheme="teal" onClick={handleNextMonth} flex="1" ml={2}>
            {months[(currentMonthIndex + 1) % months.length].name}
          </Button>
        </Flex>
        <ListWorkHours arrayList={arrayList} />
      </Flex>

      {/* Footer */}
      <Box as="footer" bg="teal.500" py={4} px={8} color="white" mt="auto">
        <Text textAlign="end">
          © 2024 Minha Aplicação. Todos os direitos reservados.
        </Text>
      </Box>
    </Flex>
  );
};

export default Home;
