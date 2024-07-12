/* eslint-disable react/prop-types */
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { formatarDataParaBrasileiro } from "../../utils/FormatDate";

const ListWorkHours = ({ arrayList }) => {
  const [totalHours, setTotalHours] = useState("00:00");
  const [monthlyHours, setMonthlyHours] = useState("00:00");

  useEffect(() => {
    console.log("estou no componet", arrayList);
    calculateTotalHours();
  }, [arrayList]);

  const calculateTotalHours = () => {
    let totalMinutes = 0;
    let monthlyMinutes = 0;

    arrayList.forEach((item) => {
      const [hours, minutes] = item.total.split(":").map(Number);
      totalMinutes += hours * 60 + minutes;
      // Assuming monthlyHours is a total for the current month, summing up the same as totalHours for now
      monthlyMinutes += hours * 60 + minutes;
    });

    setTotalHours(
      `${Math.floor(totalMinutes / 60)
        .toString()
        .padStart(2, "0")}:${(totalMinutes % 60).toString().padStart(2, "0")}`
    );
    setMonthlyHours(
      `${Math.floor(monthlyMinutes / 60)
        .toString()
        .padStart(2, "0")}:${(monthlyMinutes % 60).toString().padStart(2, "0")}`
    );
  };

  return (
    <Box
      minWidth="100%"
      mx="auto"
      mt={5}
      p={6}
      borderRadius="md"
      boxShadow="md"
      bg="gray.700"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
        <Box bg="teal.500" p={4} borderRadius="md" boxShadow="md">
          <Text color="#fff" fontSize="lg">
            Horas Mensais
          </Text>
          <Text color="#fff" fontSize="xl">
            {`176:00`}
          </Text>
        </Box>
        <Box bg="orange.500" p={4} borderRadius="md" boxShadow="md">
          <Text color="#fff" fontSize="lg">
            Soma Total de Horas
          </Text>
          <Text color="#fff" fontSize="xl">
            {totalHours}
          </Text>
        </Box>
      </SimpleGrid>
      <TableContainer maxWidth={{ base: "250px", md: "100%" }} overflowX="auto">
        <Table variant="striped" colorScheme="gray.700">
          <Thead>
            <Tr>
              <Th color="#fff">Data</Th>
              <Th color="#fff">Entrada manhã</Th>
              <Th color="#fff">Saída da manhã</Th>
              <Th color="#fff">Entrada tarde</Th>
              <Th color="#fff">Saída da tarde</Th>
              <Th color="#fff">Total (hrs)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {arrayList.map((item, i) => (
              <Tr key={i}>
                <Td color="#fff">{formatarDataParaBrasileiro(item.date)}</Td>
                <Td color="#fff">{item.morningStart}</Td>
                <Td color="#fff">{item.morningEnd}</Td>
                <Td color="#fff">{item.afternoonStart}</Td>
                <Td color="#fff">{item.afternoonEnd}</Td>
                <Td color="#fff">{item.total ? item.total : ""}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListWorkHours;
