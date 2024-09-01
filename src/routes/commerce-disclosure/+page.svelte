<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
    import { _ } from 'svelte-i18n';
   
    $: disclosureItems = [
      { item: $_('disclosure.legal_name'), value: $_('disclosure.legal_name_value') },
      { item: $_('disclosure.address'), value: $_('disclosure.address_value') },
      { item: $_('disclosure.phone_number'), value: $_('disclosure.phone_number_value') },
      { item: $_('disclosure.email_address'), value: $_('disclosure.email_address_value') },
      { item: $_('disclosure.head_of_operations'), value: $_('disclosure.head_of_operations_value') },
      { item: $_('disclosure.additional_fees'), value: $_('disclosure.additional_fees_value') },
      { item: $_('disclosure.exchanges_returns_policy'), value: $_('disclosure.exchanges_returns_policy_value') },
      { item: $_('disclosure.delivery_times'), value: $_('disclosure.delivery_times_value') },
      { item: $_('disclosure.accepted_payment_methods'), value: $_('disclosure.accepted_payment_methods_value') },
      { item: $_('disclosure.payment_period'), value: $_('disclosure.payment_period_value') },
      { item: $_('disclosure.price'), value: $_('disclosure.price_value') },
    ];
  </script>
  
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">{$_('disclosure.commerce_disclosure_title')}</h1>
    
    <Table striped={true}>
      <TableBody>
        {#each disclosureItems as { item, value }}
          <TableBodyRow>
            <TableBodyCell>{item}</TableBodyCell>
            <TableBodyCell>{value}</TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>