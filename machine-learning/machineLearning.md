# Amazon Comprehend

- [Amazon Comprehend](https://aws.amazon.com/comprehend/)
- Natural Language Processing (NLP) service
- **Analyze and understand text using machine learning** — without you having to build or train NLP models yourself
  - Sentiment. Understands emotional tone
    - Positive, Negative, Neutral, Mixed
  - Entities. Extract entities
    - Names, Organizations, Locations, Dates, Events
  - Key phrases. Pulls out key phrases from text automatically
  - Language. Detects the language of the text
  - PII. Detects personally identifiable information
    - Emails, Phone numbers, Credit card numbers
- Use pre-trained or custom models

# Amazon Kendra

- [Amazon Kendra](https://aws.amazon.com/kendra/)
- Intelligent search service powered by machine learning (ML)
  - **Serach in text and get accurate, human-like, ranked answers — not just keyword matches**
    - Mimic interacting with a human expert
  - [Question types](https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html#kendra-query-types)
    - Factoid
      - To answer specific, precise questions that expect a short, exact answer
    - Descriptive
      - To answer broader, explanatory questions
    - Keyword
      - Traditional search queries — not full questions
  - Data Source - original data
  - Index - build searchable index from the Source Data
  - Run indexing on a schedule

# Amazon Lex

- [Amazon Lex](https://aws.amazon.com/lex/)
- **AI Chat Builder**
  - Build
    - Chatbots
    - Voice assistants
    - Conversational interfaces
  - Understand user intent and respond conversationally — via **text** or **voice**
  - Provides Automatic Speech Recognition (ASP) - speech-to-text
  - Provides Natural Language Understanding (NLU) - Intent
  - Provides Bots
- Concepts
  - Intent - an action user wants to perform
  - Lambda can fulfil the intent
