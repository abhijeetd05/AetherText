# AetherText

**AetherText** is a Chrome extension that detects abusive, offensive, and targeted language in real time.  
Inspired by tools like Grammarly, it helps users stay safe from harmful online content by classifying text into different categories with a **color-coded system**.  

The extension supports **English** abusive language detection using a **fine-tuned Hugging Face transformer model**.  
Additionally, it is benchmarked against **TweetEval** — a unified NLP benchmark for Twitter-specific tasks.

---

## Features

- **Real-time text analysis**: Highlight any text on a webpage to see instant predictions.  
- **Popup mode**: Input text directly in the extension popup to check classification.  
- **Color-coded results**:  
  - 🟩 **Green** → Not Offensive  
  - 🟧 **Orange** → Offensive  
  - 🟥 **Red** → Targeted Offensive  .  
- **Lightweight & fast**: Powered by Hugging Face transformers with task-specific fine-tuning.  


---

## Benchmarking with TweetEval

AetherText is aligned with **[TweetEval](https://github.com/cardiffnlp/tweeteval)**, a standardized benchmark for social media NLP tasks.  
TweetEval consists of **seven Twitter-specific classification tasks**:

1. **Sentiment Analysis** – Positive, Negative, Neutral  
2. **Emotion Recognition** – Anger, Joy, Sadness, Optimism  
3. **Offensive Language Detection** – Offensive vs Non-offensive  
4. **Hate Speech Detection** – Hateful vs Non-hateful  
5. **Irony Detection** – Ironic vs Non-ironic  
6. **Stance Detection** – Favor, Against, Neutral (for topics like feminism, climate, etc.)  
7. **Emoji Prediction** – Predicts most likely emoji  

**Why this matters for AetherText:**  
- Our extension directly tackles **Offensive Language** and **Hate Speech** detection.  
- By benchmarking on TweetEval, we can **fairly compare AetherText’s Hinglish-enabled model against state-of-the-art baselines** (e.g., RoBERTa, LSTM, FastText).  
- Standard metrics (macro-F1, recall) ensure **transparent evaluation**.  

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abhijeetd05/AetherText/
   cd AetherText

2. **Load Chrome Extension**:

- Open Chrome and go to `chrome://extensions/`  
- Enable **Developer Mode**  
- Click **Load unpacked** and select the `AetherText/` folder  

---

## Usage

### Popup Mode
- Click the AetherText icon in Chrome.  
- Enter text in the input box.  
- Click **Check** to get instant classification.  

### Highlight Mode
- Highlight any text on a webpage.  
- A tooltip will display the classification result.  

---

## Backend Details

- Built with **Flask** (Python)  
- **CORS enabled** for Chrome extension communication  
- Uses **Hugging Face Transformers** fine-tuned on:  
  - **English abusive datasets** (HASOC, HOT)  
- **Evaluation** possible with **TweetEval datasets** for standard benchmarking  

---


## 📂 File Structure

```plaintext
AetherText/
extension
    ├─ content.js       # Injected into webpages for highlight mode
    ├─ popup.js            # Handles popup input and backend 
    ├─ popup.html          # Extension popup UI
    ├─ background.js      # Handles fetch requests to Flask backend
    ├─ manifest.json       # Chrome extension manifest
├─ requirements.txt    # Python dependencies
├─ app.py              # Flask backend
```


---

##  Future Improvements

-  **Image-to-text abusive detection** (OCR + NLP)  
-  **Cloud deployment** for global access (no local backend required)  
-  **Real-time suggestions** for replacing offensive text  
-  **Expand multilingual support** beyond Hinglish  
-  **Multi-task learning integration** with TweetEval tasks (e.g., irony, stance detection)  

---

##  References

- Barbieri, Francesco, et al. **TweetEval: Unified Benchmark and Comparative Evaluation for Tweet Classification.** *arXiv:2010.12421* (2020). [[Paper PDF]](http://arxiv.org/abs/2010.12421)  
- Cardiff NLP TweetEval Repo: [https://github.com/cardiffnlp/tweeteval](https://github.com/cardiffnlp/tweeteval)  
- Hugging Face Transformers: [https://huggingface.co/transformers](https://huggingface.co/transformers)  



