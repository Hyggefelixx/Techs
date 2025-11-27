# AI

## 感知机 1957年

弗兰克・罗森布拉特提出的早期人工神经网络模型，核心价值是首次确立 “训练 - 预测” 的范式。它可实现二值分类，通过训练数据优化模型参数，但存在致命局限 —— 仅能处理线性可分问题，无法解决异或等简单非线性问题，这一缺陷曾导致神经网络研究陷入停滞。

## 多层感知机 MLP 1986年

在反向传播算法推动下兴起的多层神经网络模型，相比单层感知器增加了隐藏层。这一结构使其突破线性可分的限制，能够学习复杂的非线性映射关系，比如捕捉自然语言中复杂的语义依赖，为后续深度学习模型的结构设计提供了基础思路。

## 联邦学习 FL

> [FL基础] McMahan, B., Moore, E., Ramage, D., Hampson, S., & y Arcas, B. A. (2017). Communication-Efficient Learning of Deep Networks from Decentralized Data. Proceedings of the 20th International Conference on Artificial Intelligence and Statistics (AISTATS).

- 摘要： 联邦学习的开山之作，提出了FedAvg算法，是理解联邦学习运行机制和核心思想的必读文献。

## 成员推理攻击

> [MIA基础] Shokri, R., Stronati, M., Song, C., & Shmatikov, V. (2017). Membership Inference Attacks Against Machine Learning Models. Proceedings of the IEEE Symposium on Security and Privacy (S&P).

- 摘要： 首次系统性地提出针对机器学习模型的成员推理攻击（MIA），是本研究中隐私泄露评估方法论的理论基础。

## FL投毒攻击

> [FL投毒攻击] Bagdasaryan, E., Veit, A., Hua, Y., Estrin, D., & Shmatikov, V. (2020). How To Backdoor Federated Learning. Proceedings of the 23rd International Conference on Artificial Intelligence and Statistics (AISTATS).

- 摘要： 联邦学习后门攻击的经典论文，详细阐述了恶意参与方如何通过模型替换等方式进行投毒，对于理解RQ1中模型投毒的迁移至关重要。

## LLM隐私

> [LLM隐私] Carlini, N., Tramer, F., Wallace, E., Jagielski, M., Herbert-Voss, A., Lee, K., ... & Raffel, C. (2021). Extracting Training Data from Large Language Models. Proceedings of the 30th USENIX Security Symposium.

- 摘要： 揭示了大型语言模型强大的“记忆能力”可能导致训练数据的直接泄露，为本研究中“为何FedLLM存在成员隐私风险”提供了核心论据。
  
