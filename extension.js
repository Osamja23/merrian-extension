class MerriamExtension {
  getInfo() {
    return {
      id: 'merriamExtension',
      name: 'Merriam-Webster',
      color1: '#FFD43B',
      blocks: [
        {
          opcode: 'getMWDefinition',
          blockType: Scratch.BlockType.REPORTER,
          text: 'definition of [WORD]',
          arguments: {
            WORD: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'innovation'
            }
          }
        }
      ]
    };
  }

  async getMWDefinition(args) {
    const word = encodeURIComponent(args.WORD.trim().toLowerCase());
    const apiKey = 'e63fe4f7-8b0e-4c32-aa99-5bf80c9ef370';
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data) && typeof data[0] === 'object' && data[0].shortdef) {
        return data[0].shortdef[0] || 'No definition available';
      }

      if (Array.isArray(data) && typeof data[0] === 'string') {
        return 'Not found. Did you mean: ' + data.slice(0, 3).join(', ') + '?';
      }

      return 'Definition not available';
    } catch (e) {
      return 'Error fetching definition';
    }
  }
}

Scratch.extensions.register(new MerriamExtension());
