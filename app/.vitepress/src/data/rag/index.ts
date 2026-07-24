import { DOCS_MINDSDB_LINK } from "~@/data/url-config";

export const ragCases = [
  {
    href: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/opengauss_agegraph.html`,
    label: 'openGauss AGEGraph + 大模型实现GraphRAG，助力更强RAG',
  },
  {
    href: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/opengauss_eulercopilot.html`,
    label: '从数据到智能：openGauss + openEuler Intelligence的RAG架构实战',
  },
  {
    href: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/opengauss_springboot.html`,
    label: 'Spring Boot集成openGauss DataVec实现高效RAG知识问答',
  },
  {
    href: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/datavec_qwen3.html`,
    label: '基于Qwen3 + openGauss，部署个人专属RAG知识库系统',
  },
  {
    href: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/opengauss_ragpratice.html`,
    label: '打破AI黑盒，拥抱开源力量：基于openGauss + DeepSeek的本地知识库，打造你的专属AI助手',
  },
  {
    href: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/opengauss_dify.html`,
    label: 'openGauss DataVec + Dify，快速搭建你的智能助手平台',
  },
  {
    href: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/opengauss_ragflow.html`,
    label: 'openGauss + Ragflow 从部署到集成',
  },
];

export interface EcoItem {
  name: string;
  link?: string;
  active?: boolean;
}

export const applications: EcoItem[] = [
  { name: '智能问答服务', active: true, link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/opengauss_eulercopilot.html` },
  { name: '智能助手平台', active: true, link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/opengauss_dify.html` },
  { name: '私人知识库', active: true, link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/datavec_qwen3.html` },
  { name: '搜索问答', active: true, link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/opengauss_ragflow.html` },
  { name: '图检索增强生成', active: true, link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/opengauss_agegraph.html` },
  { name: '代码生成器' },
  { name: '智慧公文助手' },
  { name: '会议纪要助手' },
];

export const evaluation: EcoItem[] = [
  { name: 'Arize Pheonix' },
  { name: 'DeepEval' },
  { name: 'ollama qwen3 reranker' }
];

export const monitoring: EcoItem[] = [
  { name: 'Grafana' },
  { name: 'Prometheus' },
  { name: 'Jaeger' }
];

export const knowledge: EcoItem[] = [
  { name: 'WhyHow' },
  { name: 'MindsDB', active: true, link: `${DOCS_MINDSDB_LINK}/integrations/data-integrations/opengauss` },
];

export const dataSources: EcoItem[] = [
  { name: 'Airbyte' },
  { name: 'Kafka' },
  { name: 'Apify' },
  { name: 'Docling' },
  { name: 'Unstructred' }
];

export const orchestration: EcoItem[] = [
  { name: 'LangChain', active: true, link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/opengauss_agegraph.html` },
  { name: 'LlamaIndex', active: true, link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/llama_index.html` },
  { name: 'HayStack' },
  { name: 'AnythingLLM', active: true, link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/anythingllm.html` },
  { name: 'SpringBoot', active: true, link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/opengauss_springboot.html` },
  { name: 'Dify', active: true, link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/dify.html#%E4%BD%BF%E7%94%A8opengauss%E9%83%A8%E7%BD%B2dify` },
  { name: 'RAGFlow', active: true, link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/opengauss_ragflow.html` },
  { name: 'MCP', active: true, link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/mcp.html` },
  { name: 'FastGPT' },
];

export const llms: EcoItem[] = [
  { name: 'Sentence Transformer', link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/sentence_transformer.html`, active: true },
  { name: 'BGE M3', link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/embedding_bgem3.html`, active: true },
  { name: 'nomic-embed-text', link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/embedding_nomic.html`, active: true },
  { name: 'Ollama', link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/datavec_qwen3.html`, active: true },
  { name: 'vLLM', active: true, link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/inference_acceleration.html` },
  { name: 'SGLang' },
];

export const computingArch: EcoItem[] = [
  { name: 'CUDA', active: true },
  { name: 'CANN', active: true },
];

export const cloudNative: EcoItem[] = [
  { name: 'Docker', link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/installation_guide/installing_the_container_image.html`, active: true },
  { name: 'K8s', active: true, link: '/zh/blogs/buter/k8Sinit_guide.html' },
];

export const os: EcoItem[] = [{ name: 'openEuler', link: `${import.meta.env.VITE_DOCS_ORIGIN}/zh/docs/latest/datavec/opengauss_eulercopilot.html`, active: true }];

export const hardware: EcoItem[] = [
  { name: 'CPU', active: true },
  { name: 'GPU/NPU', active: true },
];
