# AI

## 感知机 1957年

弗兰克・罗森布拉特提出的早期人工神经网络模型，核心价值是首次确立 “训练 - 预测” 的范式。它可实现二值分类，通过训练数据优化模型参数，但存在致命局限 —— 仅能处理线性可分问题，无法解决异或等简单非线性问题，这一缺陷曾导致神经网络研究陷入停滞。

## 多层感知机 MLP 1986年

在反向传播算法推动下兴起的多层神经网络模型，相比单层感知器增加了隐藏层。这一结构使其突破线性可分的限制，能够学习复杂的非线性映射关系，比如捕捉自然语言中复杂的语义依赖，为后续深度学习模型的结构设计提供了基础思路。

## 联邦学习 FL

> [FL基础] McMahan, B., Moore, E., Ramage, D., Hampson, S., & y Arcas, B. A. (2017). Communication-Efficient Learning of Deep Networks from Decentralized Data. Proceedings of the 20th International Conference on Artificial Intelligence and Statistics (AISTATS).

- 摘要： 联邦学习的开山之作，提出了FedAvg算法，是理解联邦学习运行机制和核心思想的必读文献。

## 成员推理攻击

如何简要理解成员推理攻击？

相当于是，首先我有一个待攻击的模型，我有一部分数据，这部分数据有AB两类，A类是我明确知道这个模型训练的时候使用过的数据，B类是我明确知道这个模型训练的时候没有使用过的数据，我把AB两类数据放入这个模型，得到相关指标，并通过相关手段建立一个新的有关指标和AB类的模型，然后现在有一个新的数据，不知道模型训练的时候有没有用过，我把它放入这个模型得到指标然后把这个指标放入建立的新模型中，就得到了对这个新数据属于A类还是B类的判断

> [MIA基础] Shokri, R., Stronati, M., Song, C., & Shmatikov, V. (2017). Membership Inference Attacks Against Machine Learning Models. Proceedings of the IEEE Symposium on Security and Privacy (S&P).

- 摘要： 首次系统性地提出针对机器学习模型的成员推理攻击（MIA），是本研究中隐私泄露评估方法论的理论基础。

## FL投毒攻击

> [FL投毒攻击] Bagdasaryan, E., Veit, A., Hua, Y., Estrin, D., & Shmatikov, V. (2020). How To Backdoor Federated Learning. Proceedings of the 23rd International Conference on Artificial Intelligence and Statistics (AISTATS).

- 摘要： 联邦学习后门攻击的经典论文，详细阐述了恶意参与方如何通过模型替换等方式进行投毒，对于理解RQ1中模型投毒的迁移至关重要。

## LLM隐私

> [LLM隐私] Carlini, N., Tramer, F., Wallace, E., Jagielski, M., Herbert-Voss, A., Lee, K., ... & Raffel, C. (2021). Extracting Training Data from Large Language Models. Proceedings of the 30th USENIX Security Symposium.

- 摘要： 揭示了大型语言模型强大的“记忆能力”可能导致训练数据的直接泄露，为本研究中“为何FedLLM存在成员隐私风险”提供了核心论据。
  
## 大语言模型

预训练和微调是大预言模型开发流程中先后衔接的两个阶段，所有实用化的大语言模型几乎都经历 “预训练→适配（含微调）” 的流程，仅存在 “是否公开预训练基座”“适配方式不同” 的差异。

### 预训练大语言模型:基础基座

预训练大语言模型（Pre-trained Large Language Models，简称 Pre-trained LLMs）是指基于海量文本语料，通过无监督或自监督学习预先训练得到的、参数规模庞大的语言模型，核心是具备通用语言理解和生成能力，可适配多种下游任务。

核心特征:

1. **海量预训练数据**：训练语料覆盖广泛，包括书籍、网页、论文等公开文本（如 Pile 数据集达 800GB），确保模型学习通用语言规律和知识。

2. **庞大参数规模**：参数数量通常达数十亿甚至千亿级（如 Pythia-6.9B 含 69 亿参数、LLaMA2-13B 含 130 亿参数），支撑复杂语义理解与生成。

3. **预训练 + 适配的范式**：先通过预训练掌握语言基础（语法、逻辑、常识），再经微调、提示工程等方式适配具体任务（无需从零训练）。

4. **autoregressive 生成机制**：主流模型采用自回归方式，基于前文 tokens 预测下一个 token 的概率分布，实现连贯文本生成。

典型例子:

- 开源模型：Pythia 系列、LLaMA2、Falcon、OPT 等

- 闭源模型：GPT-3.5/4、Gemini-1.5、Claude 等

### 微调模型:适配后形态

是在预训练模型基础上，通过 “微调”（或其他适配方式）优化后的模型，目的是让模型适配特定场景。

特点：基于预训练基座衍生而来，不存在 “脱离预训练的微调模型”—— 微调是预训练模型的 “后续优化步骤”，而非独立类别。

### 更合理的模型分类维度

若按 “开发阶段 + 适配方式” 划分，常见分类如下：

1. **预训练基座模型**：仅完成预训练，未做任何任务适配（如原始 LLaMA2-7B、Pythia-160M），多为开源模型，供研究者二次开发。

2. **微调模型**：通过 “监督微调（SFT）” 优化，适配特定任务（如论文中的 LLaMA-Doctor，基于 LLaMA3.2-3B 微调用于医疗问答；OPT-History 用于历史问答）。

3. **提示工程适配模型**：不修改预训练参数，通过提示词（Prompt）引导模型完成任务（如 ChatGPT 早期版本的零样本 / 少样本使用），无需微调。

4. **人类反馈强化学习（RLHF）模型**：在微调基础上，结合人类反馈进一步优化（如 GPT-4、Claude 3），提升输出的实用性和安全性。
