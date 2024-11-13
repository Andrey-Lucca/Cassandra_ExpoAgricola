import { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import "./App.css";
import {
  Button,
  Form,
  Input,
  Layout,
  ConfigProvider,
  Select,
  message,
  Col,
  Row,
  Avatar,
} from "antd";
import axios from "axios";

type LayoutType = Parameters<typeof Form>[0]["layout"];

type Product = {
  id_produto?: string;
  nome_produto: string;
  variedade: string;
};

type Producer = {
  id_produtor?: string;
  nome_produtor: string;
  municipio: string;
  bairro: string;
  telefone: string;
};

const URL_PRODUCTS = "http://localhost:3333/api/products";
const URL_PRODUCERS = "http://localhost:3333/api/producers";
const URL_REGISTRATION = "http://localhost:3333/api/registration";

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("vertical");
  const [fruits, setFruits] = useState<Product[]>([]);
  const [selectFruit, setSelectedFruit] = useState<string>("");
  const [producerName, setProducerName] = useState<string>("");
  const [producerPhone, setProducerPhone] = useState<string>("");
  const [productType, setProductType] = useState<
    "default" | "organico" | "convencional" | "não_convencional"
  >("default");
  const userLoggedIn = {
    id_usuario: "8c7d13a3-e836-4031-b085-11bb405bb7c2",
    email: "Caio.castro@example.com",
    nome: "Caio Castro",
    funcao: "Cadastrador",
  };
  const pontuacaoFinal = null;

  const handleFruits = async (): Promise<void> => {
    try {
      const response = await axios.get(URL_PRODUCTS);
      setFruits(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    handleFruits();
  }, []);

  const changeFruitValue = (product_id: string) => {
    setSelectedFruit(product_id);
  };

  const getUserId = async (): Promise<Producer | null> => {
    const producerBody = {
      nome_produtor: producerName,
      telefone: producerPhone,
    };
    try {
      const response = await axios.post(URL_PRODUCERS, producerBody);
      return response.data[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const producer = await getUserId();
    const producer_id = producer ? producer.id_produtor : null;
    const data = {
      id_produtor: producer_id,
      id_produto: selectFruit,
      tipo_produto: productType,
      pontuacao_final: pontuacaoFinal,
      id_usuario: userLoggedIn.id_usuario,
    };
    try {
      const response = await axios.post(URL_REGISTRATION, data);
      if (response.status !== 201) {
        message.error("Erro ao realizar inscrição");
        return;
      }
      setProducerName("");
      setProducerPhone("");
      setProductType("default");
      setSelectedFruit("");
      message.success("Inscrição realizada");
    } catch (error) {
      console.log("Error =>", error);
    }
  };

  return (
    <ConfigProvider>
      <Layout style={{ padding: "30px", backgroundColor: "#FFF" }}>
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <Col xs={24} sm={16} md={18}>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "10px",
              }}
            >
              <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
                Inscrição ABCEL
              </h1>
              <Form
                layout={formLayout}
                style={{ maxWidth: "600px", margin: "0 auto" }}
                initialValues={{ layout: formLayout }}
              >
                <Form.Item label="Nome do produtor rural">
                  <Input
                    value={producerName}
                    placeholder="Exemplo: João da Silva"
                    onChange={(e) => setProducerName(e.target.value)}
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Item>

                <Form.Item label="Telefone do produtor rural">
                  <Input
                  value={producerPhone}
                    placeholder="Exemplo: 99 99999-9999"
                    onChange={(e) => setProducerPhone(e.target.value)}
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Item>

                <Form.Item label="Escolha o produto + tipo">
                  <Select
                    value={selectFruit}
                    placeholder="Selecione um produto"
                    onSelect={(value) => changeFruitValue(value)}
                    style={{
                      borderRadius: "8px",
                    }}
                  >
                    {fruits.map((fruit) => (
                      <Select.Option
                        key={fruit.id_produto}
                        value={fruit.id_produto}
                      >
                        {`${fruit.nome_produto} - ${fruit.variedade}`}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Escolha o tipo do produto">
                  <Select
                    value={productType}
                    placeholder="Selecione o tipo"
                    onSelect={(value) => setProductType(value)}
                    style={{
                      borderRadius: "8px",
                    }}
                  >
                    <Select.Option key={"organico"} value={"organico"}>
                      Orgânico
                    </Select.Option>
                    <Select.Option key={"convencional"} value={"convencional"}>
                      Convencional
                    </Select.Option>
                    <Select.Option
                      key={"nao_convencional"}
                      value={"nao_convencional"}
                    >
                      Não Convencional
                    </Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Nota Final">
                  <Input
                    placeholder="Ainda não julgado"
                    disabled={true}
                    style={{
                      borderRadius: "8px",
                    }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    onClick={handleSubmit}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      fontSize: "16px",
                    }}
                  >
                    Confirmar Inscrição
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>

          <Col
            xs={24}
            sm={8}
            md={6}
            style={{ textAlign: "center", marginTop: "50px" }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Avatar
                size={64}
                icon={<UserOutlined />}
                style={{ marginBottom: "20px" }}
              />
              <h3>{userLoggedIn.nome}</h3>
              <p>{userLoggedIn.funcao}</p>
            </div>
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
