from openai import OpenAI

api_key = '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'  # Replace with your OpenAI API key


client = OpenAI(api_key=api_key)


response = client.moderations.create(
    model="omni-moderation-latest",
    input="fuck off",
)

rs=response.results

print(rs[0].flagged)